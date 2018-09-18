var express = require('express');
var router = express.Router();

/* GET ERROR. */
router.get('/', function(req, res, next) {
    if(req.description === null) {
        req.description = '¡Error interno de servidor!';
    }
    res.render('error', {
        title: 'IPN - Error',
        heroTitle: 'Error: 500',
        description: req.description,
        back: true
    });
});

module.exports = router;
