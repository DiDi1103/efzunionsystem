var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    number: String,
    realname: String,
    admin: Boolean,
    email: String,
    emailpasswd: String,
    priv: Number,
    unionId: String
});

module.exports = mongoose.model('User', userSchema);

