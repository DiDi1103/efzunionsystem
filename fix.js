var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/union');

var User = require('./model/user');

User.find({email: null}, function(err, user) {
    for (var i = 0; i < user.length; ++ i) {
        User.findOne({email: {$ne: null}, number: user[i].number}, function(err, user) {
            if (user) {
                User.findOne({email: null, number: user.number}, function(err, temp) {
                    user.unionId = temp.unionId;
                    user.save(function(err) {});
                    User.remove({email: null, number: user.number}, function(err) {});
                });
            }
        });
    }
});
