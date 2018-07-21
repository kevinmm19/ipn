var express = require('express');
var router = express.Router();
var user = require('../models/user');

/* GET contact page. */
router.get('/', function(req, res, next) {
  user.find(function(err, content) {
    console.log('Users: ' + content.length);
    res.render('contacto', { 
      title: 'IPN - Contacto',
      heroTitle: 'Contacto',
      name: 'contacto',
      description: 'IPN pone a su disposición nuestro call center: (506) 2280-8787, ó complete el siguiente formulario y nos estaremos comunicando con usted. También puede comunicarse con nosotros al siguiente correo electrónico: info@ipn.co.cr', 
      users: content });
  });
});

module.exports = router;
