//videoController.js

//import videoModel
Video = require('./videoModel');

exports.index = function (req, res) {
  Video.get(function (err, videos) {
    if(err) {
      res.json ({
        status: "error",
        message: "err"
      });
    }
    res.json({
      //status: "success",
      //message: "Videos retrieved successfully",
      videos
    });
  });
};

//Handle createVideos actions
exports.new = function(req, res) {
  var video = new Video();
  video.title = req.body.title ? req.body.title : video.title;
  video.speakers = req.body.speakers;
  video.url = req.body.url;
  video.date = req.body.date;
  video.tags = req.body.tags;
  var parsed = req.body.date.split('-');
  //var dateStr = req.body.date;
  video.month = parsed[1];
  video.day = parsed[2];
  video.year = parsed[0];

  video.save(function (err) {
    res.json({
      message: "New video created",
      data: video
    });
  });
};

exports.last4Months = function(req, res) {
  console.log("**** last4months ****");
  var currMonth = new Date().getMonth() + 1;
  var currYear = new Date().getFullYear();
  const monthYear = new Map();
  for(i=0; i<4; i++) {
    if(currMonth-i <= 0) {
      currMonth = 12 + i;    //This is to offset the value (currMonth-i)
      currYear -= 1;
    }
    monthYear.set(currMonth-i, currYear);
  }

  var qString = "";
  for (const [k, v] of monthYear) {
     qString += "{ 'month': " + k + ", 'year': " + v + " }, ";
  }
  qString = qString.substring(0, qString.length - 2);
  console.log("**** qString: " + qString + "****");

  Video.find(
    { $or: JSON.parse("[" + qString.replace(/'/g, '"') + "]") },
    function(err, videos) {
    if(err) {
      res.send(err);
    }
    res.json({
      //message: "video details loading",
      videos
    });
  });
};

exports.delete = function(req, res) {
  Video.findOneAndRemove({_id: ObjectId(req.params.video_id)}, function(err, video) {
    if(err) {
      res.send(err);
    }
    res.json({
      message: "video deleted successfully",
      data: video
    });
  });
};

//Handle view video info
exports.view = function(req, res) {
  console.log("req.params.video_id:"+req.params.video_id)
  Video.findById(req.params.video_id, function(err, video) {
    if(err) {
      res.send(err);
    }
    res.json({
      message: "video details loading",
      data: video
    });
  });
};

//Handle update video info
exports.update = function(req, res) {
  Video.findById(req.params.video_id, function(err, video) {
    if(err) {
      //res.send(err);
      res.json({
        message: "internal error",
        data: err
      })
    }
    video.title = req.body.title ? req.body.title : video.title;
    video.speakers = req.body.speakers;
    video.url = req.body.url;
    video.date = req.body.date;
    video.tags = req.body.tags;
    var parsed = req.body.date.split('-');
    video.month = parsed[1];
    video.day = parsed[2];
    video.year = parsed[0];

    //Save the video and check for errors
    video.save(function(err) {
      if(err) {
        res.json(err);
      }
      res.json({
        message: "video info updated",
        data: video
      });
    });
  });
};
