//promiseController.js

//import promiseModel
Pms = require('./promiseModel');

exports.index = function (req, res) {
  Pms.get(function (err, promises) {
    if(err) {
      res.json ({
        status: "error",
        message: "err"
      });
    }
    res.json({
      //status: "success",
      //message: "Promises retrieved successfully",
      promises
    });
  });
};

//Handle createPromise actions
exports.new = function(req, res) {
  var promise = new Pms();
  promise.statement = req.body.statement ? req.body.statement : promise.statement;
  promise.ref = req.body.ref;
  promise.date = req.body.date;

  promise.save(function (err) {
    res.json({
      message: "New promise created",
      data: promise
    });
  });
};

//handle today's promise
exports.todays_promise = function(req, res) {
  console.log("**** todays promise ****");
  var d = new Date();
  var dd = d.getDate();
  dd = dd < 10 ? '0' + dd : dd;
  var mm = d.getMonth() + 1;
  mm = mm < 10 ? '0' + mm : mm;
  var yy = d.getFullYear();
  var tdy = mm + '/' + dd + '/' + yy;
  console.log("**** today:" + tdy + " ****");

  Pms.find({ date: tdy }, function(err, promises) {
    if(err) {
      res.send(err);
    }
    res.json({
      //message: "promise loading",
      promises
    });
  });
};


//Handle update promise info
exports.update = function(req, res) {
  Pms.findById(req.params.date, function(err, promise) {
    if(err) {
      res.send(err);
    }
    promise.statement = req.body.statement ? req.body.statement : promise.statement;
    promise.ref = req.ref;

    //Save the promise and check for errors
    promise.save(function(err) {
      if(err) {
        res.json(err);
      }
      res.json({
        message: "promise info updated",
        data: promise
      });
    });
  });
};
