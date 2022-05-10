var express = require('express');
var router = express.Router();

/* GET pages function. */
router.get('/', function(req, res) {
  res.render('home');
});

router.get('/about', function(req, res) {
  res.json({message : 'this is about page'})
});

router.get('/services', (req, res) => {
  res.json({message: 'this is service page'});
});

router.get('/hero_register', (req, res) => {
  res.json({message: 'this is hero register page'});
});

module.exports = router;
