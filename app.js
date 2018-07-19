var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');

// sass
var sassMiddleware = require('node-sass-middleware');
var srcPath = __dirname + '/sass';
var destPath = __dirname + '/public/styles';

// routes
var indexRouter = require('./routes/index');
var blogRouter = require('./routes/blog');
var contactRouter = require('./routes/contact');

// mongoDB connection
var app = express();
mongoose.connect('mongodb://localhost/ipn');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function() {
  console.log('Connected');
});

// adding the sass middleware
app.use(
  sassMiddleware({
      src: srcPath, 
      dest: destPath,
      debug: true,
      outputStyle: 'compressed',
      prefix: 'styles'
  })
);

// Register Handlebars view engine
app.engine('.hbs', 
  expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    partialsDir: [
      __dirname + '/public/components/article',
      __dirname + '/public/components/footer',
      __dirname + '/public/components/form',
      __dirname + '/public/components/fragment',
      __dirname + '/public/components/header',
      __dirname + '/public/components/hero',
      __dirname + '/public/components/nav'
    ],
    helpers: {
      is: function (value1, value2) {
        if(value1 === value2) {
          return true;
        } else 
          return false;
      }
    }
  })
);

// Use Handlebars view engine
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes Handlers
app.use('/', indexRouter);
app.use('/blog', blogRouter);
app.use('/contacto', contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Error 404: La página no existe.');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next){
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error', { error: err, title: 'IPN - Error', name: 'error', relpath: './', isNotRoot: true });
});

module.exports = app;
