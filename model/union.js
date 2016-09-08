var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var unionSchema = new Schema({
    id: String,
    name: String,
    time: String,
    pos: String,
    leader: String,
    teacher: String,
    more: String,
    score: String,
    chosen: Number,
    interview: String,
    limit: Number
});

module.exports = mongoose.model('Union', unionSchema);

