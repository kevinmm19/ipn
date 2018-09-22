var express = require('express');
var router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
    res.render('contacto', { 
      title: 'IPN - Contacto',
      heroTitle: 'Contacto',
      description: 'Complete el siguiente formulario y nos estaremos comunicando con usted. También puede comunicarse con nosotros al siguiente correo electrónico: info@ipn.co.cr'
    });
});

module.exports = router;
