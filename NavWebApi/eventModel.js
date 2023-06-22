//eventModel.js

var mongoose = require('mongoose').set('debug', true);

//setup schema
var eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  speakers: {
    type: String,
    required: true
  },
  message: String
});

//export eventModel
var Event = module.exports = mongoose.model('event', eventSchema);

module.exports.get = function (callback, limit) {
  Event.find(callback).limit(limit);
}
