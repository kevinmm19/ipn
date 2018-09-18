var express = require('express');
var router = express.Router();

/* GET CONFIRM. */
router.get('/', function(req, res, next) {
    res.render('confirm', {
        title: 'IPN - Success',
        heroTitle: '¡Gracias por contactarnos!',
        description: 'Responderemos tu mensaje, en la menor brevedad posible.'
    });
});

module.exports = router;
