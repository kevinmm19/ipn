var express = require('express');
var router = express.Router();
var project = require('../models/project');

/* GET home page. */
router.get('/', function(req, res, next) {
  project.find(function(err, content) {
    console.log('Projects: ' + content.length);
    res.render('index', { 
      title: 'IPN',
      heroTitle: 'Ingeniería de Procesos de Negocios',
      name: 'home',
      description: 'Acompañando empresas líderes en el logro de resultados',
      projects: content });
  });
});

module.exports = router;