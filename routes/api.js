const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');

router.get('/highscore', apiController.highscore_GET);

router.post('/highscore', apiController.highscore_POST);

router.post('/scores', apiController.scores_POST);

module.exports = router;
