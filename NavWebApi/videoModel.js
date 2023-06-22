//videoModel.js

var mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);

//setup schema
var videoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  speakers: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  date: {
    type: DateOnly,
    required: true
  },
  tags: {
    type: String,
    required: true
  },
  day: Number,
  month: Number,
  year: Number
});

//export videoModel
var Video = module.exports = mongoose.model('video', videoSchema);

module.exports.get = function (callback, limit) {
  Video.find(callback).limit(limit);
}
