//promiseModel.js

var mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);

//setup schema
var promiseSchema = mongoose.Schema({
  date: {
    type: DateOnly,
    required: true
  },
  statement: {
    type: String,
    required: true
  },
  ref: {
    type: String,
    required: true
  }
});

//export promiseModel
var Pms = module.exports = mongoose.model('promise', promiseSchema);

module.exports.get = function (callback, limit) {
  Promise.find(callback).limit(limit);
}
