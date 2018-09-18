var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    message: String,
    createdAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

// Contact model creation to use the contactSchema
var Contact = mongoose.model('Contact', contactSchema, 'contact');

// methods
contactSchema.methods.add = function(req) {
    var contact = new Contact();
    contact.userId = req.body.user._id;
    contact.message = req.body.message;
    contact.save(function(err, doc) {
        // if(err) {
        //     res.json({ error: true, message: '¡Error en creación de Contacto!' });
        // } 
        // res.json({ error: false, message: '¡Contacto guardado!' });
        if (err) {
            console.log('err evaluation Contact Add &s', err);
            return res.json({success: false, user: null});
        }
        console.log('Before return doc Contact Add &s', doc._id);
        return res.json({success: true, user: doc});
    });
}

Contact.find({}, function(err, contacts) {
    if (err) throw err;
    console.log('Contacts Found: ' + contacts.length);
    console.log(contacts);
});

module.exports = Contact;