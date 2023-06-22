// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
       status: 'API Its Working',
       message: 'Welcome to RESTHub crafted with love!'
    });
});


var eventController = require('./eventController');
var videoController = require('./videoController');
var photoController = require('./photoController');
var promiseController = require('./promiseController');

router.route('/events')
        .get(eventController.index)
        .post(eventController.new);

router.route('/events/:event_id')
        .get(eventController.view)
        .patch(eventController.update)
        .put(eventController.update);

//Video routes
router.route('/videos')
        .get(videoController.index)
        .post(videoController.new);

router.route('/videos/last4months')
        .get(videoController.last4Months)

router.route('/videos/:video_id')
        .get(videoController.view)
        .patch(videoController.update)
        .put(videoController.update);

router.route('/promises')
        .get(promiseController.index)
        .post(promiseController.new);

router.route('/promises/todays_promise')
        .get(promiseController.todays_promise);
        


// Export API routes
module.exports = router;
