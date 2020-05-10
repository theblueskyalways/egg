var crypto = require('crypto'),
    fs = require('fs'),
    formidable = require('formidable'),
    http = require('http'),
    path = require('path'),
    mkdir = require('mkdirp');

function _toCDB(val) {
    var res = '';
    for (var i = 0; i < val.length; i++) {
        if (val.charCodeAt(i) > 65248 && val.charCodeAt(i) < 65375) {
            res += String.fromCharCode(val.charCodeAt(i) - 65248);
        }
        else {
            res += String.fromCharCode(val.charCodeAt(i));
        }
    }
    return res;
}

module.exports.static = function (path) {
    return 'http://shuxue.zhixinglexue.com/public' + (path[0] == '/' ? path : '/' + path);
};

module.exports.trim = function (val) {
    val = val || '';
    if (typeof val === 'string') {
        return val.replace(/^(　| )+|(　| )+$/g, "");
    }
    return val;
};

module.exports.today = () => {
    return module.exports.toInt(module.exports.now() / 86400, 0) * 86400;
};

module.exports.yesterday = () => {
    return module.exports.today() - 86400;
};

module.exports.toCDB = function (obj) {
    if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; ++i) {
            obj[i] = _toCDB(obj[i]);
        }
        return obj;
    }
    return _toCDB(obj);
};

module.exports.empty = function (val) {
    if (val === undefined || val === null) {
        return true;
    }
    if (Array.isArray(val)) {
        return val.length == 0;
    }
    if (typeof val === 'string') {
        return val.length == 0;
    }
    if (typeof val === 'number') {
        return val === 0;
    }
    return false;
};

module.exports.toInt = function (val, defVal) {
    defVal = defVal || 0;
    if (typeof val == 'boolean') {
        return val ? 1 : 0;
    }
    val = parseInt(val);
    return isNaN(val) ? defVal : val;
};

module.exports.now = () => {
    return parseInt(Date.now() / 1000);
};

/**
 * @return {string}
 */
module.exports.encrypt = (key, data) => {
    var cipher = crypto.createCipheriv('aes-128-ecb', key, ''), res = [];
    cipher.setAutoPadding(true);
    res.push(cipher.update(data, 'utf8', 'base64'));
    res.push(cipher.final('base64'));
    return res.join('');
};

module.exports.decrypt = (key, data) => {
    var cipher = crypto.createDecipheriv('aes-128-ecb', key, ''), res = [];
    cipher.setAutoPadding(true);
    res.push(cipher.update(data, 'base64', 'utf8'));
    res.push(cipher.final('utf8'));
    return res.join('');
};

function _upload(conf, file, opts, cb) {
    //noinspection JSUnresolvedVariable
    var school = module.exports.toInt(opts.school, -1),
        server = school >= 0 ? conf.resource_server : conf.static_server[Date.now() % conf.static_server.length],
        results = {error: 1},
        boundary = '----------PJ&5X^Kg4F8@M183GIQXQ*f0jAwVOaaIFM8K&SN!s!jvhsg0^Sc0kc1bGKowttSV----------',
        unzip = school >= 0 && module.exports.toInt(opts.unzip, 0),
        req = http.request({
            host: server.address,
            port: server.port,
            method: 'POST',
            path: '/upload',
            headers: {
                'Content-Type': 'multipart/form-data; boundary=' + boundary,
                'Connection': 'keep-alive',
                'product': conf.product,
                'school': school,
                'unzip': unzip,
                'pack': unzip > 0 && module.exports.toInt(opts.pack, 0)
            }
        }, function (res) {
            res.encoding = 'utf8';
            res
                .on('data', function (data) {
                    data = JSON.parse(data);
                    if (data.error === 0) {
                        data.url = server.host + data.path;
                        results = data;
                    }
                })
                .on('end', function () {
                    cb(results);
                });
        });
    req.write('--' + boundary + '\r\n' +
        'Content-Disposition: form-data; name="file"; filename="' + path.basename(file) + '"\r\n' +
        'Content-Type: application/octet-stream\r\n\r\n'
    );

    var stream = fs.createReadStream(file, {bufferSize: 1024 * 1024});
    stream.pipe(req, {end: false});
    stream
        .on('end', function () {
            req.end('\r\n--' + boundary + '--');
        })
        .on('error', function () {
            cb(results);
        });
}

function upload(req, conf, opts, cb) {
    var opts_ = opts, cb_ = cb;
    if (typeof opts === 'function') {
        cb_ = opts;
        opts_ = {};
    }
    //noinspection JSUnresolvedVariable
    if (module.exports.toInt(req.headers['content-length'], 0) > module.exports.toInt(opts_.maxSize, 20) * 1024 * 1024) {
        return cb_(null, {error: 413});
    }
    //noinspection JSUnresolvedFunction,JSUnresolvedVariable
    if (!fs.existsSync(conf.tmp_dir) && !mkdir.sync(conf.tmp_dir)) {
        // 创建目录失败
        cb_(null, {error: 1});
    } else {
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        //noinspection JSUnresolvedVariable
        form.uploadDir = conf.tmp_dir;
        form.keepExtensions = true;
        form.parse(req, function (err, fields, files) {
            var file = files['file'];
            if (!err && file) {
                opts_.pack = module.exports.toInt(fields.pack, 0);
                _upload(conf, file.path, opts_, (data) => {
                    if (data.error === 0) {
                        cb_(null, {
                            error: 0,
                            url: data.url,
                            size: file.size,
                            type: file.type,
                            name: file.name,
                            originalName: file.name,
                            book:file.book
                        });
                    } else {
                        cb_(null, {error: 1});
                    }
                });
            } else {
                cb_(null, {error: 1});
            }
        });
    }
}

module.exports.upload = function (req, conf, opts) {
    return new Promise((resolve, reject) => {
        upload(req, conf, opts, (err, data) => {
            if (!err) {
                resolve(data);
            }
            else {
                reject(err);
            }
        });
    });
};

module.exports.merge = (obj1, obj2) => {
    for (var key in obj2) {
        obj1[key] = obj2[key];
    }
    return obj1;
};

module.exports.padding = (num, n) => {
    return Array(n > num ? (n - ('' + num).length + 1) : 0).join(0) + num;
}