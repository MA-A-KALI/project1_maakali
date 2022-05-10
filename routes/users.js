var express = require('express');
var router = express.Router();
const consumerController = require('../controllers/consumerController');

/* API routes */
router.get('/login', function(req, res, /*next*/) {
  res.send('respond with a resource');
});

/* consumer login and register */
router.get('/register', consumerController.consumer_create_get);

router.post('/register', consumerController.consumer_create_post);



module.exports = router;
