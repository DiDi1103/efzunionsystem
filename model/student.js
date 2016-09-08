var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var studentSchema = new Schema({
    number: String,
    name: String
});

module.exports = mongoose.model('Student', studentSchema);

