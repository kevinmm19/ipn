var express = require('express');
var router = express.Router();
var blog = require('../models/article');

/* GET home page. */
router.get('/', function(req, res, next) {
  blog.find(function(err, content) {
    console.log('Length: ' + content.length);
    res.render('index', { title: 'Blog', articles: content });
  });
});

module.exports = router;