var express = require('express');
var router = express.Router();
var project = require('../models/project');

/* GET home page. */
router.get('/', function(req, res, next) {
  project.find(function(err, docs) {
    res.render('index', { 
      title: 'IPN',
      heroTitle: 'Ingeniería de Procesos de Negocios',
      description: 'Acompañando empresas líderes en el logro de resultados',
      projects: docs });
  });
});

module.exports = router;