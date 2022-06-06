const express = require('express');
const router = express.Router();
//const { requireAuth } = require('../middleware/authMiddleware');
const heroController = require('../controllers/heroController');

/* Hero Functionality */
router.post('/hero_register', heroController.hero_register_post);
router.get('/hero_register', function (req, res) {
    res.render('hero_register');
});

module.exports = router;