var express = require('express');
var router = express.Router();
var blog = require('../models/article');

/* GET home page. */
router.get('/blog', function(req, res, next) {
  blog.find(function(err, content) {
    console.log('Length: ' + content.length);
    res.render('blog', { title: 'IPN - Blog', name: 'blog', relpath: './', isNotRoot: true, articles: content });
  });
});

module.exports = router;