const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.index);

router.get('/login', indexController.login_GET);
router.post('/login', indexController.login_POST);

router.get('/signup', indexController.signup_GET);
router.post('/signup', indexController.signup_POST);

router.get('/logout', indexController.logout);

router.get('/about', indexController.about);

router.get('/game', indexController.game);

router.get('/profile', indexController.profile);
router.get('/profile/delete', indexController.profileDelete_GET);
router.post('/profile/delete', indexController.profileDelete_POST);

module.exports = router;
