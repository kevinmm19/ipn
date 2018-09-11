var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    message: String,
    createdAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

// User model creation to use the userSchema
var Contact = mongoose.model('Contact', contactSchema, 'contact');

// methods
contactSchema.methods.add = function(req) {
    var contact = new Contact();
    contact.userId = req.user._id;
    contact.message = req.message;
    contact.save(function(err) {
        if(err) {
            res.json({ error: true, message: 'Fail on Contact creation!' });
        } 
        res.json({ error: false, message: 'Contact saved!' });
    });
}

Contact.find({}, function(err, contacts) {
    if (err) throw err;
  
    // object of all the contacts
    console.log('Contacts Found: ' + contacts.length);
    //console.log(contacts);
});

module.exports = Contact;