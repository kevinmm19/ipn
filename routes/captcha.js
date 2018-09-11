var express = require('express');
var router = express.Router();
var config = require('../config.js');
var request = require('request');

/* POST CAPTCHA. */
router.post('/', function(req, res, next) {
    request.get(
        config.reCAPTCHA + '?secret=' + config.secret + '&response=' + req.body.response,
        function (error, response, body) {
            res.send(body);
        }
    );
});

module.exports = router;
