var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: String,
    url: String,
    intro: String,
    image: String,
    author: String,
    date: String,
    active: { type: Boolean, default: true }
});

// Article model creation to use the articleSchema
var Article = mongoose.model('Article', articleSchema, 'article');

// methods
Article.find({}, function(err, articles) {
    if (err) throw err;
  
    // object of all the articles
    console.log('Length: ' + articles.length);
    console.log(articles);
});

// make this available to the user in the Node application
module.exports = Article;