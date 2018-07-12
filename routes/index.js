var express = require('express');
var router = express.Router();
var project = require('../models/project');

/* GET home page. */
router.get('/', function(req, res, next) {
  project.find(function(err, content) {
    console.log('Length: ' + content.length);
    res.render('index', { title: 'IPN', name: 'home', relpath: './', projects: content });
  });
});

module.exports = router;