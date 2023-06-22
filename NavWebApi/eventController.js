//eventController.js

//import eventModel
Event = require('./eventModel');

exports.index = function (req, res) {
  Event.get(function (err, events) {
    if(err) {
      res.json ({
        status: "error",
        message: "err"
      });
    }
    console.log("***** events:" + events + "*****");
    res.json({
      //status: "success",
      //message: "Events retrieved successfully",
      events
    });
  });
};

//Handle createEvent actions
exports.new = function(req, res) {
  var event = new Event();
  event.title = req.body.title ? req.body.title : event.title;
  event.venue = req.body.venue;
  event.date = req.body.date;
  event.time = req.body.time;
  event.speakers = req.body.speakers;

  event.save(function (err) {
    res.json({
      message: "New event created",
      data: event
    });
  });
};

//Handle view event info
exports.view = function(req, res) {
  Event.findById(req.params.event_id, function(err, event) {
    if(err) {
      res.send(err);
    }
    res.json({
      message: "event details loading",
      data: event
    });
  });
};

//Handle update event info
exports.update = function(req, res) {
  Event.findById(req.params.event_id, function(err, event) {
    if(err) {
      res.send(err);
    }
    event.title = req.body.title ? req.body.title : event.title;
    event.venue = req.body.venue;
    event.date = req.body.date;
    event.time = req.body.time;
    event.speakers = req.body.speakers;

    //Save the event and check for errors
    event.save(function(err) {
      if(err) {
        res.json(err);
      }
      res.json({
        message: "event info updated",
        data: event
      });
    });
  });
};
