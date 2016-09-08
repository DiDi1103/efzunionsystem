var express = require('express');
var router = express.Router();

var Union = require('../model/union');
var User = require('../model/user');
var Student = require('../model/student');
var Time = require('../model/timer');

router.get('/login', function(req, res) {
    res.render('usercenter/login', {
        title: '登录 - 二附中社团系统',
        csrf: req.csrfToken(),
        user: req.session.user
    });
});

router.get('/register', function(req, res) {
    res.render('usercenter/register', {
        title: '注册 - 二附中社团系统',
        csrf: req.csrfToken()
    });
});

router.use('*', function(req, res, next) {
    if (req.session.user) {
        req.user = req.session.user;
        next();
    } else return res.redirect('/usercenter/login');
});

router.get('/', function(req, res, next) {
    if (req.user.unionId) {
        Union.findOne({id: req.user.unionId}, function(err, union) {
            req.union = union;
            next();
        });
    } else next();
});

router.get('/', function(req, res) {
    res.render('usercenter/index', {
        title: '用户中心 - 二附中社团系统',
        csrf: req.csrfToken(),
        index: true,
        user: req.user,
        union: req.union
    });
});

router.get('/choose', function(req, res) {
    Union.find(function(err, unions) {
        res.render('usercenter/choose', {
            title: '选择社团 - 二附中社团系统',
            csrf: req.csrfToken(),
            unions: unions,
            choose: true,
            user: req.user
        });
    });
});

router.get('/logout', function(req, res) {
    req.session.user = null;
    res.redirect('/');
});

router.use('*', function(req, res, next) {
    if (req.user.priv && req.user.priv > 1) next();
    else {
        res.status(403);
        res.send('<h1>403 forbidden</h1>');
    }
});

router.get('/leader', function(req, res) {
    Student.find(function(err, students) {
        User.find({unionId: req.user.unionId}, function(err, user) {
            res.render('usercenter/leader', {
                title: '社长入口 - 二附中社团系统',
                csrf: req.csrfToken(),
                user: req.user,
                students: students,
                members: req.user.unionId ? user : []
            });
        });
    });
});

router.use('*', function(req, res, next) {
    if (req.user.priv && req.user.priv > 2) next();
    else {
        res.status(403);
        res.send('<h1>403 forbidden</h1>');
    }
});

router.get('/admin', function(req, res, next) {
    Union.find(function(err, unions) {
        req.unions = unions;
        next();
    });
});

router.get('/admin', function(req, res) {
    Time.findOne({type: 'import'}).sort({_id: -1}).exec(function(err, time) {
        Time.findOne({type: 'choose'}).sort({_id: -1}).exec(function(err, time2) {
            res.render('usercenter/admin', {
                title: '管理入口 - 二附中社团系统',
                user: req.user,
                importDate: time,
                chooseDate: time2,
                unions: req.unions
            });
        });
    });
});

router.get('/admin/csv/:unionId', function(req, res, next) {
    res.header('Content-Type', 'text/csv; charset=utf-16le; header=present;');
    res.header('Content-disposition', 'attachment; filename=output.csv');
    Union.findOne({id: req.params.unionId}, function(err, union) {
        req.csv = union.name + '\r\n学号,姓名\r\n';
        next();
    });
});

router.get('/admin/csv/:unionId', function(req, res) {
    User.find({unionId: req.params.unionId}).sort({number: 1}).exec(function(err, user) {
        for (var i = 0; i < user.length; ++ i) {
            req.csv += user[i].number + ',' + user[i].realname + '\r\n';
        }
        var Iconv = require('iconv').Iconv;
        var iconv = new Iconv('utf8', 'utf16le');
        var buffer = iconv.convert(req.csv);
        res.write(new Buffer([0xff, 0xfe]));
        res.write(buffer);
        res.end();
    });
});

router.get('/admin/union/:unionId', function(req, res, next) {
    Union.findOne({id: req.params.unionId}, function(err, union) {
        req.unionName = union.name;
        next();
    });
});

router.get('/admin/union/:unionId', function(req, res, next) {
    User.find({unionId: req.params.unionId}, function(err, user) {
        req.querydata = {};
        req.querydata.user = user;
        next();
    });
});

router.get('/admin/union/:unionId', function(req, res) {
    res.render('usercenter/viewer', {user: req.querydata.user, unionName: req.unionName});
});

module.exports = router;
