var express = require('express');
var router = express.Router();

var User = require('../model/user');

var auth = require('../model/auth');

var Detail = require('../model/detail');
var Union = require('../model/union');
var Student = require('../model/student');
var Timer = require('../model/timer');

router.use('/union/query', function(req, res) {
    Detail.findOne({
        id: req.param('id')
    }, function(err, union) {
        res.json(union);
    });
});

router.post('/user/login', function(req, res) {
    User.findOne({username: req.body.username}, function(err, doc) {
        if (doc) {
            if (doc.password == req.body.password) {
                req.session.user = doc;
                return res.json({msg: '登录成功'});
            } else {
                res.status(500);
                return res.json({err: '用户名或密码错误'});
            }
        } else {
            res.status(500);
            return res.json({err: '用户名或密码错误'});
        }
    });
});

router.post('/user/register', function(req, res, next) {
    if (req.body.password != req.body.repasswd) {
        res.status(500);
        return res.json({err: '两次输入密码不一致'});
    } else if (req.body.realname == '') {
        res.status(500);
        return res.json({err: '未输入真实姓名'});
    } else next();
});

router.post('/user/register', function(req, res, next) {
    Student.findOne({number: req.body.number}, function(err, student) {
        if (!student || student.name != req.body.realname) {
            res.status(500);
            return res.json({err: '真实姓名与学号不匹配'});
        } else next();
    });
});

router.post('/user/register', function(req, res, next) {
    User.findOne({email: null, number: req.body.number}, function(err, user) {
        if (user) {
            req.body.unionId = user.unionId;
            next();
        } else next();
    });
});

router.post('/user/register', function(req, res) {
    auth.auth(req.body.email, req.body.emailpasswd, function(err, doc) {
        if (doc) {
            delete req.body.repasswd;
            User.findOne({username: req.body.username}, function(err, doc) {

                if (doc) {
                    res.status(500);
                    return res.json({err: '用户名已经存在'});
                }

                User.findOne({email: req.body.email}, function(err, doc) {

                    if (doc) {
                        res.status(500);
                        return res.json({err: '校园邮箱已经被绑定'});
                    }

                    var user = new User(req.body);

                    user.save(function(err) {
                        if (err) {
                            res.status(500);
                            return res.json({err: 'Unknown Error.'});
                        }
                        return res.json({msg: '注册成功'});
                    });

                });

            });
        } else {
            res.status(500);
            return res.json({err: '校园邮箱验证失败'});
        }
    });
});

router.use('*', function(req, res, next) {
    if (req.session.user) {
        req.user = req.session.user;
        next();
    } else {
        res.status(403);
        res.send('<h1>403 forbidden</h1>');
    }
});

router.get('/union/apply', function(req, res) {
    Union.findOne({id: req.param('id')}, function(err, union) {
        if (union.interview == '是') {
            return res.json({err: '该社团为面试社团，不可选择'});
        } else if (union.chosen < union.limit) {
            User.findOne({username: req.user.username}, function(err, user) {
                if (user.unionId) res.json({err: '您选择过社团了'});
                else {
                    user.unionId = req.param('id');
                    req.session.user = user;
                    user.save(function() {
                        res.json({err: '选择成功'});
                        Union.update({id: req.param('id')}, {$inc: {chosen: 1}}, {}, function(err, docs) {});
                    });
                }
            });
        } else res.json({err: '选满了'});
    });
});

router.use('*', function(req, res, next) {
    if (req.user.priv > 1) next();
    else {
        res.status(403);
        res.send('<h1>403 forbidden</h1>');
    }
});

router.get('/union/member/add', function(req, res) {
    if (!req.user.unionId) return res.json({err: '你并不是社长'});
    User.findOne({
        number: req.param('number')
    }, function(err, user) {
        if (user) {
            if (user.unionId && user.unionId != '0')
                return res.json({err: '对方已有社团'});
            user.unionId = req.user.unionId;
            user.save(function() {
                return res.json({msg: '添加成功！', name: user.realname, number: user.number});
            });
        } else {
            Student.findOne({number: req.param('number')}, function(err, student) {
                var temp = {
                    number: req.param('number'),
                    unionId: req.user.unionId,
                    realname: student.name
                };
                var usr = new User(temp);
                usr.save(function() {
                    return res.json({msg: '添加成功！(tmp)', number: temp.number, name: temp.realname});
                });
            });
        }
    });
});

router.get('/union/member/del', function(req, res) {
    User.findOne({number: req.param('number')}, function(err, user) {
        if (user) {
            if (user.unionId == req.user.unionId) {
                user.unionId = null;
                delete user.unionId;
                user.save(function() {
                    return res.json({msg: 'ok'});
                });
            } else return res.json({msg: ''});
        } else res.json({msg: ''});
    });
});

router.use('*', function(req, res, next) {
    if (req.user.priv > 2) next();
    else {
        res.status(403);
        res.send('<h1>403 forbidden</h1>');
    }
});

router.get('/date/import', function(req, res) {
    var data = {
        type: 'import',
        startDate: req.param('startDate'),
        endDate: req.param('endDate')
    };
    var timer = new Timer(data);
    timer.save(function() {
        return res.json({msg: 'ok'});
    });
});

router.get('/date/choose', function(req, res) {
    var data = {
        type: 'choose',
        startDate: req.param('startDate'),
        endDate: req.param('endDate')
    };
    var timer = new Timer(data);
    timer.save(function() {
        return res.json({msg: 'ok'});
    });
});

module.exports = router;