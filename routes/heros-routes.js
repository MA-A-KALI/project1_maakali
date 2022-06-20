const express = require('express');
const router = express.Router();
//const { requireAuth } = require('../middleware/authMiddleware');
const upload = require('../middleware/fileVerificationMiddleware');
const heroController = require('../controllers/heroController');

/* Hero Functionality */
router.post('/hero_register', heroController.hero_register_post);
router.get('/hero_register', function (req, res) {
    res.render('hero_register');
});

router.post('/hero_login', heroController.hero_login_post);

router.get('/hero_page', (req, res) => {
    res.render("HERO PAGE");
})

router.put('/:id', heroController.hero_update_data);

module.exports = router;