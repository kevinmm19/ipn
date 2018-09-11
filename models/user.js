var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

// Schema
var userSchema = new Schema({
    name: String,
    email: String,
    number: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

// User model creation
var User = mongoose.model('User', userSchema, 'user');

// Methods
userSchema.methods.findByEmail = function(email) {
    User.findOne({email: email}).then(function(user) {
        if(!user) {
            return null;
        }
        return user;
    }).catch(done);
};

userSchema.methods.add = async function(req, res) {
    //console.log('Inside add method');
    //var res = { error: false, user: doc, message: 'User updated!' }
    // var user = new User();
    // user.name = req.body.name;
    // user.email = req.body.email;
    // user.number = req.body.phone;
    console.log('Req.body ' + req.body.name + ' ' + req.body.email + ' ' + req.body.phone);
    //POST /user 500 45.495 ms - 4868
    const result = await User.findOneAndUpdate(
        { email: req.body.email }, 
        { name: req.body.name, number: req.body.phone, updatedAt: Date.now() }, 
        { upsert: true, new: true }, 
        function (err, doc) {
            //POST /user 500 45.495 ms - 4868
            console.log('Before err evaluation &s', err);
            console.log('Before doc evaluation &s', doc);
            if (err) {
                //return res.json({doc: null, error: true});
                return null;
            }
            console.log('Before return doc &s', doc.email);
            //Error: Can't set headers after they are sent.
            //return res.json({doc: doc, error: false});
            return doc;
            // console.log('Inside findOneAndUpdate method');
            // if (doc.length) {
            //     console.log('Inside docLength method');
            //     return { error: false, user: doc, message: 'User updated!' };
            // } else {
            //     console.log('Before save Mongoose');
            //     user.save(function(err) {
            //         console.log('Inside save Mongoose');
            //         if(err) {
            //             console.log('Inside save error Mongoose');
            //             return { error: true, user: null, message: 'Fail on User creation!' };
            //         }
            //         console.log('End of save Mongoose, success ' + user.email + ' ' + user._id);
            //         return { error: false, user: user, message: 'User saved!' };
            //     });
            // }
        }
    ).catch(function(err) {
        console.log(err);
    });
    console.log('Before result doc &s', result);
    return result;
}

// make this available to the user in the Node application
module.exports = User;