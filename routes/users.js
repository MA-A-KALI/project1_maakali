var express = require('express');
var router = express.Router();
var consumer = require('../controllers/consumerController');
//var hero = require('../controllers/')

/* Consumer functionality. */

/**
 * Consumer Register
 * - Will Return Consumer Data in JSON Format
 */
router.post('/consumer_register', consumer.consumer_register_post);

/**
 * Consumer Login Router
 * - Will Return Consumer Token in JSON Format
 * - Uses JWT
 */
router.post('/consumer_login', consumer.consumer_login_post); //

/**
 * Consumer Update Data Router
 * - Will Return Updated Customer Data in JSON Format
 * - Take Consumer _id in Route to Find Consumer Data
 */
router.put('/consumer/:_id', consumer.consumer_update_data); 

/**
 * Consumer Logout
 * - Will Redirect
 */
router.get('/consumer_logout', consumer.consumer_logout);

/* Hero Functionality */
// router.post('/hero_register', )

module.exports = router;
