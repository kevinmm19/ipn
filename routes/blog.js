var express = require('express');
var router = express.Router();
var blog = require('../models/article');

/* GET blog page. */
router.get('/', function(req, res, next) {
  blog.find(function(err, content) {
    console.log('Articles: ' + content.length);
    res.render('blog', { 
        title: 'IPN - Blog',
        heroTitle: 'Blog',
        name: 'blog',
        description: 'Artículos publicados en el periódico El Financiero',
        articles: content
    });
  });
});

module.exports = router;