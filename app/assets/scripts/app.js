//var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ipn');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function() {
    console.log('We are connected!');
});