var express = require('express');
var router = express.Router();
var user = require('../models/user');

/* GET contact page. */
router.get('/contacto', function(req, res, next) {
  user.find(function(err, content) {
    console.log('Users: ' + content.length);
    res.render('contacto', { title: 'IPN - Contacto', name: 'contacto', relpath: './', isNotRoot: true, users: content });
  });
});

module.exports = router;
