var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/union');

var User = require('./model/user');
var Union = require('./model/union');

function ct(i) {
    if (i == 48) return;
    User.where('unionId', String(i)).count(function(err, count) {
        console.log(i, count);
        Union.findOne({id: String(i)}, function(err, union) {
            union.chosen = count;
            union.save(function() {
                ct(i + 1);
            });
        });
    });
}

ct(1);
