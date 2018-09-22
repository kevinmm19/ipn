var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Contact = require('../models/contact');

/* POST user. */
router.post('/', async function(req, res, next) {
  try {
    const userRes = await User.schema.methods.add(req);
    if(userRes !== undefined && userRes.success) {
        const contactRes = await Contact.schema.methods.add(userRes.user, req.body.message);
        if(contactRes !== undefined && contactRes.success) {
          const mailRes = await User.schema.methods.sendEmail(userRes.user, req.body.message);
          res.send(mailRes);
        } else {
          res.json({success: false, url: '/status/e'});
        }
    } else {
        res.json({success: false, url: '/status/e'});
    }
  } catch (err) {
    res.json({success: false, url: '/status/e'});
  }
});

module.exports = router;
