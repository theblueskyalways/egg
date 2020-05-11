const express = require('express'),
  mysql = require('./mysql'),
  consts = require('./consts'),
  verify = require('./verify'),
  conf = require('../conf.json').badminton,
  array = require('../common/array'),
  md5 = require('md5'),
  _ = require('lodash'),
  moment = require('moment'),
  code = require('../common/code'),
  func = require('../common/func'),
  pub = require('./pubALEX'),
  router = express.Router();

/* 随机产生一个n位的字母或数字*/
function random(length) {
  let res = '';
  for (let i = 0; i < length; i++) {
    res += verify.password[Math.ceil(Math.random() * verify.password.length - 1)];
  }
  return res;
}

/* 登陆页*/
router.get('/login', (req, res) => {
  res.render('login', {
    product: conf.product,
  });
});

/* 登出*/
router.get('/logout', function(req, res) {
  req.session.user = null;
  res.redirect('/');
});

/* 账号密码校验*/
router.post('/login', async (req, res) => {
  try {
    const phone = func.trim(req.body.phone || ''),
      password = func.trim(req.body.password || '');
    if (func.empty(phone) || func.empty(password)) return res.json(code.message(code.InvalidParam));
    let user = await mysql.query('SELECT * FROM v_user WHERE phone=? AND password=? AND is_delete=0', [
        phone, md5(password),
      ]),
      role = array.assoc(consts.role, 'id');

    if (user.length > 0) {
      user.each(v => {
        v.role_name = array.tryGet(role, v.role, '角色已删除').name;
      });
      user = user[0];
      req.session.user = user;
      let url = '/word';
      if (user.role === consts.ADMIN) url = '/word';
      if (user.role === consts.USER) url = '/word';
      res.json({
        code: code.OK,
        user,
        url,
      });
    } else res.json({ code: code.Unknown, msg: '登录失败,账号密码错误' });
  } catch (err) {
    console.error(err);
    res.sendStatus(code.InternalError);
  }
});

/* 注册*/
router.post('/register', async (req, res) => {
  try {
    const phone = func.trim(req.body.phone || ''),
      password = func.trim(req.body.pass || ''),
      name = func.trim(req.body.name || '');
    if (func.empty(phone) || func.empty(password)) return res.json(code.message(code.InvalidParam));
    const user = await mysql.query('SELECT * FROM v_user WHERE phone=?', [
      phone,
    ]);

    if (user.length == 0) {
      const result = await mysql.query('INSERT INTO v_user(name,role,phone,password,is_delete,ctime) VALUES(?,?,?,?,?,?)', [
        name, consts.USER, phone, md5(password), 0, func.now(),
      ]);
      if (result.affectedRows == 1) {
        res.json({
          code: code.OK,
          msg: '注册成功',
        });
      }
    } else {
      res.json({
        code: code.Unknown,
        msg: '该手机已注册',
      });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(code.InternalError);
  }
});

/* 修改密码*/
router.post('/setting/password', async (req, res) => {
  try {
    if (!await verify.check(req) || !(verify.user.isAdmin(req.user) || verify.user.isXiaoZhang(req.user))) return res.json(code.message(code.InvalidParam));

    const old_ = func.trim(req.body.old_, ''),
      new_ = func.trim(req.body.new_, ''),
      count = await mysql.query('SELECT count(*) AS count FROM v_user WHERE password=? AND id=? AND is_delete=0', [
        md5(old_), req.user.id,
      ]);
    if (count[0].count <= 0) {
      res.json({
        code: code.Unknown, msg: '密码错误',
      });
      return;
    }
    await mysql.query('UPDATE v_user SET password=? WHERE id=?', [ md5(new_), req.user.id ]);
    res.json({
      code: code.OK,
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(code.InternalError);
  }
});

/* 重置密码*/
router.post('/reset/password', async (req, res) => {
  try {
    if (!await verify.check(req) || !verify.user.isAdmin(req.user)) { return res.json(code.message(code.InvalidParam)); }

    const id = func.toInt(req.body.id || 0),
      password = func.trim(req.body.password, '');
    if (id <= 0) {
      return res.json(code.message(code.InvalidParam));
    }
    const user = await mysql.query('SELECT phone FROM v_user WHERE id=? AND password=? AND is_delete=0', [
      req.user.id, md5(password),
    ]);
    const psw = random(6);
    if (user.length > 0) {
      await mysql.query('UPDATE v_user SET password=? WHERE id=? AND is_delete=0', [
        md5(psw), id,
      ]);
      res.json({
        code: code.OK, msg: '密码已重置为:' + psw,
      });

    } else {
      res.json(code.message(code.Unknown));
    }
  } catch (err) {
    console.error(err);
    res.sendStatue(code.InternalError);
  }
});

/* 操作*/
router.post('/opt', async (req, res) => {
  try {
    let id = func.toInt(req.body.params.id, 0),
      type = func.trim(req.body.params.type, ''),
      url = func.trim(req.body.params.url, '');
    console.log(id, url, type);
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
      case 'club':
        sql += ' v_club SET';
        break;
      case 'active':
        sql += ' v_active SET';
        break;
      case 'resource':
        sql += ' v_resource SET';
        break;
      case 'message':
        sql += ' v_message SET';
        break;
      default:
        return res.json({
          code: code.Unknown, msg: '参数错误',
        });
    }
    switch (type) {
      case 'delete':
        sql += ' is_delete=?';
        values = [ func.now() ];
        break;
      case 'revoke':
        sql += ' is_delete=0';
        break;
      default:
        return res.json({
          code: code.Unknown, msg: '参数错误',
        });
    }
    sql += ' WHERE id=?';
    values.push(id);
    console.log(sql, values);
    await mysql.query(sql, values);
    res.json({
      code: code.OK, msg: '操作成功',
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(code.InternalError);
  }
});

/* 用户管理*/
router.post('/user/list', async (req, res) => {
  try {
    // if (!await verify.check(req) || !verify.user.isAdmin(req.user)) return res.redirect('/');
    const name = func.trim(req.body.params.name),
      page = func.toInt(req.body.params.page);
    let sql = 'SELECT * FROM v_user WHERE 1=1',
      values = [];

    if (!func.empty(name)) {
      sql += ' AND (name LIKE ? OR phone LIKE ?)';
      values = values.concat([ '%' + name + '%', '%' + name + '%' ]);
    }
    sql += ' ORDER BY id ASC LIMIT ?,?';
    values = values.concat([ (page - 1) * consts.PAGE_SIZE, consts.PAGE_SIZE ]);
    let list = await mysql.query(sql, values);
    const role = array.assoc(consts.role, 'id');
    list = list.map(v => ({
      ...v,
      role: role[v.role].name,
      ctime: moment.unix(v.ctime).format('YYYY-MM-DD'),
    }));
    const count = await mysql.count(sql, values);
    res.json({
      code: code.OK,
      list,
      total: count,
    });
  } catch (e) {
    console.error(e);
  }
});


/* 新建user*/
router.post('/user/add', async (req, res) => {
  try {
    // if (!await verify.check(req) || !verify.user.isAdmin(req.user))
    //     return res.json({code: code.InvalidParam, msg: '参数错误'});
    const name = func.trim(req.body.name || ''),
      phone = func.trim(req.body.phone || ''),
      password = func.trim(req.body.password || '111111');

    if (func.empty(name) || func.empty(phone)) return res.json(code.message(code.InvalidParam));
    await mysql.query('INSERT INTO v_user(phone,name,password,role,ctime,is_delete) VALUES(?,?,?,?,?,?)', [
      phone, name, md5(password), consts.USER, func.now(), 0,
    ]);
    res.json({ code: code.OK, msg: '注册成功' });
  } catch (e) {
    if (e.errno === 1062) {
      res.json({
        code: code.Duplicated, msg: '手机号已经存在',
      });
    } else {
      console.error(e);
      res.sendStatus(code.InternalError);
    }
  }
});

// 用户编辑
router.post('/user/editor', async (req, res) => {
  try {
    if (!await verify.check(req) || !verify.user.isAdmin(req.user)) { return res.json({ code: code.InvalidParam, msg: '参数错误' }); }
    const id = func.toInt(req.body.id || 0),
      phone = func.trim(req.body.phone, ''),
      role = func.toInt(req.body.role, 0),
      grade = func.toInt(req.body.grade, 0),
      name = func.trim(req.body.name, '');
    if (role <= 0 || func.empty(phone) || id <= 0 || func.empty(name)) { return res.json({ code: code.InvalidParam, msg: '参数错误' }); }
    await mysql.query('UPDATE v_user SET phone=?,name=?,grade=?,role=? WHERE id=?', [ phone, name, grade, role, id ]);
    res.json({ code: code.OK });
  } catch (e) {
    console.error(e);
    res.json(code.message(code.InternalError));
  }
});

router.post('/club/listpage', async (req, res) => {
  try {
    // if (!await verify.check(req) || !verify.user.isAdmin(req.user)) return res.json({code:code.InternalError});
    const name = func.trim(req.body.params.name),
      page = func.toInt(req.body.params.page);

    let sql = 'SELECT * FROM v_club WHERE 1=1',
      values = [];
    if (!func.empty(name)) {
      sql += ' AND (name LIKE ? OR phone LIKE ?)';
      values = values.concat([ '%' + name + '%', '%' + name + '%' ]);
    }
    sql += ' ORDER BY id ASC LIMIT ?,?';
    values = values.concat([ (page - 1) * consts.PAGE_SIZE, consts.PAGE_SIZE + 1 ]);
    let list = await mysql.query(sql, values);
    let imageList = await mysql.query(`SELECT * FROM v_image WHERE club IN(${mysql.join(list.map(v => v.id))})`);
    imageList = array.assoc(imageList, 'club', 'all');
    list = list.map(v => ({
      ...v,
      adImageList: imageList[v.id] || [],
      ctime: moment.unix(v.ctime).format('YYYY-MM-DD'),
    }));
    const count = await mysql.count(sql, values);
    res.json({
      code: code.OK,
      list,
      total: count,
    });
  } catch (e) {
    console.error(e);
  }
});


/* 新建club*/
router.post('/club/add', async (req, res) => {
  try {
    const id = func.trim(req.body.params.id || 0),
      name = func.trim(req.body.params.name || ''),
      desc = func.trim(req.body.params.clubDesc || ''),
      indexImage = func.trim(req.body.params.indexImage || ''),
      imageList = JSON.parse(req.body.params.imageList || '[]'),
      payQrcode = func.trim(req.body.params.payQrcode);
    if (func.empty(name)) return res.json(code.message(code.InvalidParam));
    if (id <= 0) {
      const result = await mysql.query('INSERT INTO v_club(name,clubDesc,imageUrl,payQRcode,ctime,is_delete) VALUES(?,?,?,?,?,?)', [
        name, desc, indexImage, payQrcode, func.now(), 0,
      ]);
      let sql = 'INSERT INTO v_image(imageUrl,club) VALUES',
        values = [];
      for (let i = 0; i < imageList.length; i++) {
        sql += ' (?,?),';
        values = values.concat([ imageList[i], result.insertId ]);
      }
      sql = sql.substr(0, sql.length - 1) + ';';
      await mysql.query(sql, values);
    } else if (id > 0) {
      await mysql.query('DELETE  FROM  v_image WHERE club=?', [ id ]);
      await mysql.query('UPDATE v_club SET name=?,clubDesc=?,imageUrl=?,payQRcode=? WHERE id=?', [ name, desc, indexImage, payQrcode, id ]);
      let sql = 'INSERT INTO v_image(imageUrl,club) VALUES',
        values = [];
      for (let i = 0; i < imageList.length; i++) {
        sql += ' (?,?),';
        values = values.concat([ imageList[i], id ]);
      }
      sql = sql.substr(0, sql.length - 1) + ';';
      await mysql.query(sql, values);
    }
    res.json({ code: code.OK, msg: id > 0 ? '编辑成功' : '创建成功' });
  } catch (e) {
    console.error(e);
    res.sendStatus(code.InternalError);
  }
});


router.post('/active/listpage', async (req, res) => {
  try {
    // if (!await verify.check(req) || !verify.user.isAdmin(req.user)) return res.json({code:code.InternalError});
    const name = func.trim(req.body.params.name),
      page = func.toInt(req.body.params.page);

    let sql = 'SELECT * FROM v_active WHERE 1=1',
      values = [];
    if (!func.empty(name)) {
      sql += ' AND (name LIKE ? OR phone LIKE ?)';
      values = values.concat([ '%' + name + '%', '%' + name + '%' ]);
    }
    sql += ' ORDER BY id ASC LIMIT ?,?';
    values = values.concat([ (page - 1) * consts.PAGE_SIZE, consts.PAGE_SIZE + 1 ]);
    let list = await mysql.query(sql, values);
    const clubList = await mysql.query('SELECT id,name FROM v_club WHERE is_delete=0');
    const clubList_ = array.assoc(clubList, 'id', 'all');
    list = list.map(v => ({
      ...v,
      club: clubList_[v.club][0],
      ctime: moment.unix(v.ctime).format('YYYY-MM-DD'),
    }));
    const count = await mysql.count(sql, values);
    res.json({
      code: code.OK,
      list,
      total: count,
      clubList,
    });
  } catch (e) {
    console.error(e);
  }
});

/* 新建club*/
router.post('/active/add', async (req, res) => {
  try {
    console.log(req.body.params);
    const id = func.toInt(req.body.params.id || 0),
      title = func.trim(req.body.params.title || ''),
      activeContent = func.trim(req.body.params.activeContent || ''),
      club = func.toInt(req.body.params.club || 0);
    if (func.empty(title)) return res.json(code.message(code.InvalidParam));
    if (id <= 0) {
      await mysql.query('INSERT INTO v_active(title,activeContent,club,ctime,is_delete) VALUES(?,?,?,?,?)', [
        title, activeContent, club, func.now(), 0,
      ]);
    } else if (id > 0) {
      await mysql.query('UPDATE v_active SET title=?,activeContent=?,club=? WHERE id=?', [ title, activeContent, club, id ]);
    }
    res.json({ code: code.OK, msg: id > 0 ? '编辑成功' : '创建成功' });
  } catch (e) {
    console.error(e);
    res.sendStatus(code.InternalError);
  }
});

router.post('/apply/listpage', async (req, res) => {
  try {
    // if (!await verify.check(req) || !verify.user.isAdmin(req.user)) return res.json({code:code.InternalError});
    const name = func.trim(req.body.params.name),
      page = func.toInt(req.body.params.page);
    console.log(name);
    let sql = 'SELECT * FROM v_apply WHERE 1=1 ',
      userSql = 'SELECT id,name FROM v_user WHERE 1=1',
      userValues = [],
      values = [];
    if (!func.empty(name)) {
      userSql += ' AND name LIKE ?';
      userValues = userValues.concat([ '%' + name + '%' ]);
      const user = await mysql.query(userSql, [ userValues ]);
      sql += ` AND user IN(${mysql.join(user.map(v => v.id))})`;
    }
    sql += ' ORDER BY id DESC LIMIT ?,?';
    values = values.concat([ (page - 1) * consts.PAGE_SIZE, consts.PAGE_SIZE ]);
    let list = await mysql.query(sql, values);
    let club = await mysql.query(`SELECT id,name FROM v_club WHERE id IN (${mysql.join(list.map(v => v.club))})`);
    let user = await mysql.query(`SELECT id,name FROM v_user WHERE id IN (${mysql.join(list.map(v => v.user))})`);
    user = array.assoc(user, 'id');
    club = array.assoc(club, 'id');
    list = list.map(v => ({
      ...v,
      user: user[v.user],
      club: club[v.club],
      ctime: moment.unix(v.ctime).format('YYYY-MM-DD'),
    }));
    const count = await mysql.count(sql, values);
    res.json({
      code: code.OK,
      list,
      total: count,
    });
  } catch (e) {
    console.error(e);
  }
});

router.post('/apply/pass', async (req, res) => {
  try {
    // if (!await verify.check(req) || !verify.user.isAdmin(req.user)) return res.json({code:code.InternalError});
    const id = func.toInt(req.body.params.id);
    await mysql.query('UPDATE v_apply SET is_pass=? WHERE id=?', [ func.now(), id ]);
    res.json({
      code: code.OK,
      msg: '审核通过',
    });
  } catch (e) {
    console.error(e);
  }
});

/* 上传图片*/
router.post('/upload/image', async (req, res) => {
  try {
    const data = await pub.upload(req, res);
    if (!data.error > 0) {
      return res.json({
        code: code.OK,
        url: data.url,
        msg: '上传成功',
      });
    }
    res.json({
      code: code.Unknown,
      msg: '上传失败',
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(code.InternalError);
  }
});

module.exports = router;
