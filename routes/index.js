var express = require('express');
var router = express.Router();
var project = require('../models/project');

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  //var collection = db.get('project');
  project.find({},{},function(e,docs){
      console.log(docs.length);
      res.render('index', {
          "projects" : docs
      });
  });
  // project.find(function(err, content) {
  //   console.log('Length: ' + content.length);
  //   res.render('index', { title: 'IPN', projects: content });
  // });
});

module.exports = router;