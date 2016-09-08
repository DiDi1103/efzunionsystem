var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var detailSchema = new Schema({
    id: String,
    detail: String
});

module.exports = mongoose.model('Detail', detailSchema);

