var express = require('express'),
    path = require('path'),
    program = require('commander'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    moment = require('moment'),
    verify = require('./routes/verify'),
    app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(multiparty({uploadDir: '/home/tmp'}));//设置上传文件存放的地址.
app.use(require('express-domain-middleware'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    key: '45c01aa084ee4412ab6864656ff57010',
    secret: '20a3851b95484fba93de1dfc26765010',
    resave: true,
    saveUninitialized: true
}));

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
  });

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/admin'));
//noinspection JSUnusedLocalSymbols
app.use(function (err, req, res, next) {
    console.error(err);
    res.sendStatus(500);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
    console.error(err);
    res.sendStatus(500);
});

app.locals.dateFormat = function (timestamp, format) {
    var res = moment.unix(timestamp).format(format || 'YYYY-MM-DD HH:mm:ss');
    return res == 'Invalid date' ? '0000-00-00 00:00:00' : res;
};

app.locals.assoc = (arr, id) => {
    if (Array.isArray(arr)) {
        return arr.assoc(id);
    }
    return [];
};

app.locals.stringify = function (value) {
    return JSON.stringify(value).replace(/\\/g, '\\\\');
};

app.locals.static = function (path) {
    return func.static(path);
};

app.locals.now = function () {
    console.log(moment().format('YYYY-MM-DD'))
    return moment().unix();
};

app.locals.isAdmin = user => verify.user.isAdmin(user);

app.locals.isUser = user => verify.user.isUser(user);
app.set('view cache', false);
//noinspection JSUnresolvedVariable
module.exports = app;