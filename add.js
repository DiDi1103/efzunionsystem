var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/union');

var Student = require('./model/student');
var User = require('./model/user');
var Union = require('./model/union');
var Detail = require('./model/detail');


var stud_list = {
	'20190101': '00', 
};

for (var i in stud_list) {
    var s = new Student({number: i, name: stud_list[i]});
    s.save(() => console.log('ok'));
}

var s = new Union({id:'001', 	name:'00', 	time:'00', 	pos:'00', score:'5.0', limit:'100', chosen: 0, more: 'Hello World!', interview:'false'});
s.save(() => console.log('union ok')); 

var s = new Detail({id:'001', detail:'hahahhahahahhahahahha'});
s.save(() => console.log('detail ok'));

