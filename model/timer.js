var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var timeSchema = new Schema({
    type: String,
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model('Time', timeSchema);

