let express = require('express'),
    mysql = require('./mysql'),
    consts = require('./consts'),
    verify = require('./verify'),
    conf = require('../conf.json')['badminton'],
    array = require('../common/array'),
    md5 = require('md5'),
    _ = require('lodash'),
    moment = require('moment'),
    code = require('../common/code'),
    func = require('../common/func'),
    pub = require('./pubALEX'),
    router = express.Router();

/*随机产生一个n位的字母或数字*/
function random(length) {
    let res = '';
    for (let i = 0; i < length; i++) {
        res += verify.password[Math.ceil(Math.random() * verify.password.length - 1)];
    }
    return res;
}

/*登陆页*/
router.get('/login', (req, res) => {
    res.render('login', {
        product: conf.product
    });
});

/*登出*/
router.get('/logout', function (req, res) {
    req.session.user = null;
    res.redirect('/');
});

/*账号密码校验*/
router.post('/login', async (req, res) => {
    try {
        let phone = func.trim(req.body.phone || ''),
            password = func.trim(req.body.password || '');
        if (func.empty(phone) || func.empty(password)) return res.json(code.message(code.InvalidParam));
        let user = await mysql.query('SELECT * FROM v_user WHERE phone=? AND password=? AND is_delete=0', [
                phone, md5(password)
            ]),
            role = array.assoc(consts.role, 'id');
        if (user.length > 0) {
            user.each(v => {
                v.role_name = array.tryGet(role, v.role, '角色已删除').name;
            });
            user = user[0];
            let url = '';
            if (user.role === consts.ADMIN) url = '/ground/0_0_';
            if (user.role === consts.USER) url = '/Sview';
            req.session.user = user;
            res.json({
                code: code.OK,
                url: url
            })
        } else res.json({
            code: code.Unknown,
            msg: '登录失败,账号密码错误'
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(code.InternalError);
    }
});

/*修改密码*/
router.post('/setting/password', async (req, res) => {
    try {
        if (!await verify.check(req) || !(verify.user.isAdmin(req.user) || verify.user.isXiaoZhang(req.user))) return res.json(code.message(code.InvalidParam));

        let old_ = func.trim(req.body.old_, ''),
            new_ = func.trim(req.body.new_, ''),
            count = await mysql.query('SELECT count(*) AS count FROM v_user WHERE password=? AND id=? AND is_delete=0', [
                md5(old_), req.user.id
            ]);
        if (count[0].count <= 0) {
            res.json({
                code: code.Unknown,
                msg: '密码错误'
            });
            return;
        }
        await mysql.query('UPDATE v_user SET password=? WHERE id=?', [md5(new_), req.user.id]);
        res.json({
            code: code.OK
        })
    } catch (e) {
        console.error(e);
        res.sendStatus(code.InternalError);
    }
});

/*重置密码*/
router.post('/reset/password', async (req, res) => {
    try {
        if (!await verify.check(req) || !verify.user.isAdmin(req.user))
            return res.json(code.message(code.InvalidParam));

        let id = func.toInt(req.body.id || 0),
            password = func.trim(req.body.password, '');
        if (id <= 0) {
            return res.json(code.message(code.InvalidParam));
        }
        let user = await mysql.query('SELECT phone FROM v_user WHERE id=? AND password=? AND is_delete=0', [
            req.user.id, md5(password)
        ]);
        let psw = random(6);
        if (user.length > 0) {
            await mysql.query('UPDATE v_user SET password=? WHERE id=? AND is_delete=0', [
                md5(psw), id
            ]);
            res.json({
                code: code.OK,
                msg: '密码已重置为:' + psw
            });

        } else {
            res.json(code.message(code.Unknown));
        }
    } catch (err) {
        console.error(err);
        res.sendStatue(code.InternalError);
    }
});

/*操作*/
router.post('/opt', async (req, res) => {
    try {
        if (!await verify.check(req) || !verify.user.isAdmin(req.user)) return res.json({
            code: code.InvalidParam,
            msg: '参数错误'
        });
        let id = func.toInt(req.body.id, 0),
            type = func.trim(req.body.type, ''),
            url = func.trim(req.body.url, '');
        if (id <= 0 || func.empty(type) || func.empty(url)) {
            return res.json(code.message(code.InvalidParam));
        }
        url = url.split('/')[1];
        let sql = 'UPDATE',
            values = [];
        switch (url) {
            case 'user':
                sql += ' v_user SET';
                break;
            case 'class':
                sql += ' v_class SET';
                break;
            case 'course':
                sql += ' v_course SET';
                break;
            case 'resource':
                sql += ' v_resource SET';
                break;
            case 'message':
                sql += ' v_message SET';
                break;
            default:
                return res.json({
                    code: code.Unknown,
                    msg: '参数错误'
                });
        }
        switch (type) {
            case 'delete':
                sql += ' is_delete=?';
                values = [func.now()];
                break;
            case 'revoke':
                sql += ' is_delete=0';
                break;
            default:
                return res.json({
                    code: code.Unknown,
                    msg: '参数错误'
                });
        }
        sql += ' WHERE id=?';
        values.push(id);
        await mysql.query(sql, values);
        res.json({
            code: code.OK,
            msg: '操作成功'
        })
    } catch (e) {
        console.error(e);
        res.sendStatus(code.InternalError);
    }
});

/*获取banner列表*/
router.post('/clubBanner/list', async (req, res) => {
    try {
        let id = func.toInt(req.body.params.id, 0);
    
        
        let list = await mysql.query('SELECT id, imageUrl FROM v_club WHERE is_delete=0');
        res.json({
            code: code.OK,
            list,
        });
    } catch (e) {
        console.error(e);
        res.sendStatus(code.InternalError);
    }
});


/*获取clubList列表*/
router.post('/club/list', async (req, res) => {
    try {
        let list = await mysql.query('SELECT * FROM v_club WHERE is_delete=0');
        let allImage = await mysql.query(`SELECT club,imageUrl FROM v_image WHERE club IN(${mysql.join(list.map(v=>v.id))})`);
        allImage = array.assoc(allImage, 'club', 'all');
        list = list.map(v=>({
            ...v,
            imageList:allImage[v.id]
        }))
        res.json({
            code: code.OK,
            list,
        });
    } catch (e) {
        console.error(e);
        res.sendStatus(code.InternalError);
    }
});




router.post('/club/detail', async (req, res) => {
    try {
        // if (!await verify.check(req) || !verify.user.isAdmin(req.user)) return res.json({code:code.InternalError});
        let id = func.toInt(req.body.params.id);

        let sql = 'SELECT * FROM v_club WHERE id=?',
            values = [id];
        let list = await mysql.query(sql, values);
        
        let imageList = await mysql.query(`SELECT * FROM v_image WHERE club IN(${mysql.join(list.map(v=>v.id))})`);
        let activeList = await mysql.query(`SELECT * FROM v_active WHERE club IN(${mysql.join(list.map(v=>v.id))})`);
        imageList = array.assoc(imageList,'club','all');
        activeList = array.assoc(activeList,'club','all');
        list = list.map(v=>({
            ...v,
            adImageList:imageList[v.id],
            activeList:activeList[v.id].map(activeItem=>({
                ...activeItem,
                club:{name:v.name},
                ctime: moment.unix(activeItem.ctime).format('YYYY-MM-DD'),
            })),
            ctime: moment.unix(v.ctime).format('YYYY-MM-DD'),
        }));
        res.json({
            code:code.OK,
            data:list[0]
        })
    } catch (e) {
        console.error(e);
    }
});

router.post('/club/apply', async (req, res) => {
    try {
        // if (!await verify.check(req) || !verify.user.isAdmin(req.user)) return res.json({code:code.InternalError});
        let user = func.toInt(req.body.params.user),
            club = func.toInt(req.body.params.club);
        let result = await mysql.query('SELECT COUNT(*) AS c FROM v_apply WHERE club=? AND user=?',[club,user]);
            if(result[0].c>0){
                return res.json({
                    code:code.Unknown,
                    msg:'已经报名了此社团'
                });
            }
        let sql = 'INSERT INTO v_apply(club,user,ctime,is_pass) VALUES(?,?,?,?)',
            values = [club,user,func.now(),0];
        await mysql.query(sql, values);
        res.json({
            code:code.OK
        });
    } catch (e) {
        console.error(e);
    }
});

router.post('/active/list', async (req, res) => {
    try {
        // if (!await verify.check(req) || !verify.user.isAdmin(req.user)) return res.json({code:code.InternalError});
        let name = func.trim(req.body.params.name),
            page = func.toInt(req.body.params.page || 1);

        let sql = 'SELECT * FROM v_active WHERE 1=1',
            values = [];
        if (!func.empty(name)) {
            sql += ' AND (name LIKE ? OR phone LIKE ?)';
            values = values.concat(['%' + name + '%', '%' + name + '%']);
        }
        sql += ' ORDER BY id ASC LIMIT ?,?';
        values = values.concat([(page - 1) * consts.PAGE_SIZE, consts.PAGE_SIZE + 1]);
        let list = await mysql.query(sql, values);
        let clubList = await mysql.query(`SELECT id,name FROM v_club WHERE id IN(${mysql.join(list.map(v=>v.club))})`);
        clubList = array.assoc(clubList,'id','all');
        list = list.map(v=>({
            ...v,
            club:clubList[v.club][0],
            ctime: moment.unix(v.ctime).format('YYYY-MM-DD'),
        }));
        let count = await mysql.count(sql, values);
        res.json({
            code:code.OK,
            list,
            total:count
        })
    } catch (e) {
        console.error(e);
    }
});

router.post('/club/userList', async (req, res) => {
    try {
        // if (!await verify.check(req) || !verify.user.isAdmin(req.user)) return res.json({code:code.InternalError});
        let name = func.trim(req.body.params.name),
            user = func.toInt(req.body.params.user),
            page = func.toInt(req.body.params.page || 1);

        let clubList = await mysql.query('SELECT * FROM v_apply WHERE user=? AND is_pass>0',[user]);
        let sql = `SELECT * FROM v_club WHERE id IN(${mysql.join(clubList.map(v=>v.club))}) `,
            values = [];
        if (!func.empty(name)) {
            sql += ' AND (name LIKE ?)';
            values = values.concat(['%' + name + '%']);
        }
        sql += ' ORDER BY id ASC LIMIT ?,?';
        values = values.concat([(page - 1) * consts.PAGE_SIZE, consts.PAGE_SIZE]);
        let list = await mysql.query(sql, values);
        list = list.map(v=>({
            ...v,
            ctime: moment.unix(clubList[0].ctime).format('YYYY-MM-DD'),
        }));
        let count = await mysql.count(sql, values);
        res.json({
            code:code.OK,
            list,
            total:count
        })
    } catch (e) {
        console.error(e);
    }
});

router.post('/message/list', async (req, res) => {
    try {
        // if (!await verify.check(req) || !verify.user.isAdmin(req.user)) return res.json({code:code.InternalError});
        let club = func.toInt(req.body.params.club),
            user = func.toInt(req.body.params.user);
        let list = await mysql.query('SELECT * FROM v_message WHERE club=? ORDER BY ctime DESC ',[club]);
        let userList = await mysql.query(`SELECT id,name FROM v_user WHERE id IN(${mysql.join(list.map(v=>v.user))})`);
        userList = array.assoc(userList,'id');
        list = list.map(v=>({
            ...v,
            user: userList[v.user],
            ctime: moment.unix(v.ctime).format('YYYY-MM-DD HH-mm-ss')
        }))
        res.json({
            code:code.OK,
            list,
        })
    } catch (e) {
        console.error(e);
    }
});

router.post('/message/add', async (req, res) => {
    try {
        // if (!await verify.check(req) || !verify.user.isAdmin(req.user)) return res.json({code:code.InternalError});
        let club = func.toInt(req.body.params.club),
            message = func.trim(req.body.params.message),
            user = func.toInt(req.body.params.user);
        await mysql.query('INSERT INTO v_message(club,user,message,ctime) VALUES(?,?,?,?)',[club, user, message, func.now()]);
        res.json({
            code:code.OK,
        })
    } catch (e) {
        console.error(e);
    }
});

/*上传图片*/
router.post('/upload/ground_view', async (req, res) => {
    try {
        let data = await pub.upload(req, res);
        if (!data.error > 0) {
            return res.json({
                code: code.OK,
                url: data.url,
                msg: '上传成功'
            })
        }
        res.json({
            code: code.Unknown,
            msg: '上传失败'
        })
    } catch (e) {
        console.error(e);
        res.sendStatus(code.InternalError);
    }
});








//word

/*获取clubList列表*/
router.post('/word/list', async (req, res) => {
    try {
        let word = func.trim(req.body.params.word || ''),
            type = func.toInt(req.body.params.type || 0),
            user = func.toInt(req.body.params.user || 0);
            let sql = 'SELECT * FROM v_word WHERE 1=1',
            values=[];
        if(word){
            sql += ' AND word LIKE ?';
            values.push(`%${word}%`);
        }
        if(type){
            sql += ' AND type=?';
            values.push(type);
        }
        let list = await mysql.query(sql,values);
        list = list.map(v=>({
            ...v,
            ctime:moment.unix(v.ctime).format('YYYY-MM-DD'),
        }))
        res.json({
            code: code.OK,
            list,
        });
    } catch (e) {
        console.error(e);
        res.sendStatus(code.InternalError);
    }
});

/*新建club*/
router.post('/word/add', async (req, res) => {
    try {
        let id = func.trim(req.body.params.id || 0),
            word = func.trim(req.body.params.word || ''),
            translate = func.trim(req.body.params.translate || ''),
            user = func.toInt(req.body.params.user);
        if (func.empty(word)) return res.json(code.message(code.InvalidParam));
        if (id <= 0) {
            await mysql.query('INSERT INTO v_word(word,translate,ctime,user,type) VALUES(?,?,?,?,?)', [
                word,translate,func.now(),user,consts.NEWWORD
            ]);
        } else if (id > 0) {
            await mysql.query('UPDATE v_word SET word=?,translate=? WHERE id=?', [word,translate,id]);
        }
        res.json({code: code.OK, msg: id > 0 ? '编辑成功' : '创建成功'});
    } catch (e) {
        console.error(e);
        res.sendStatus(code.InternalError);
    }
});

router.post('/word/opt', async (req, res) => {
    try {
        let id = func.toInt(req.body.params.id || 0),
            type = func.toInt(req.body.params.type || '');
        await mysql.query('UPDATE v_word SET type=? WHERE id=?', [type,id]);
        res.json({code: code.OK, msg: '操作成功'});
    } catch (e) {
        console.error(e);
        res.sendStatus(code.InternalError);
    }
});
module.exports = router;