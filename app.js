var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodeMailer = require('nodemailer');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var config = require('./config.js');

// sass
var sassMiddleware = require('node-sass-middleware');
var srcPath = __dirname + '/sass';
var destPath = __dirname + '/public/styles';

// routes
var indexRouter = require('./routes/index');
var blogRouter = require('./routes/blog');
var contactRouter = require('./routes/contact');

// keys
const user = config.user;
const pass = config.password;
const host = config.host;
const port = config.port;
const db = config.db;
const connectionStr = 'mongodb://'+user+':'+pass+'@'+host+':'+port+'/'+db;

// mongoDB connection
var app = express();
mongoose.connect(
  connectionStr,
  { useNewUrlParser: true },
  err => {
      if (err) throw err;
      console.log('Successfully connected to database.');
  }
);

// adding the sass middleware
app.use(
  sassMiddleware({
      src: srcPath, 
      dest: destPath,
      debug: true,
      outputStyle: 'compressed',
      prefix: '/styles'
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

// email handler
app.post('/send', function (req, res) {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com', //'smtp.ethereal.email',
    port: 465, //587,
    secure: true,
    auth: {
        user: 'kevinmm.19@gmail.com', //'ji4bfe2mwf55osqi@ethereal.email',
        pass: 'Punk_Ideology' //'b4rJY3rvFgbT9FJE2H'
    }
  });
  let mailOptions = {
      from: '"Kevin Martinez" <kevinmm.19@gmail.com>', // sender address
      to: 'kevinmm.19@gmail.com', //req.body.to, // list of receivers
      subject: 'Test Email', //req.body.subject, // Subject line
      text: 'Test body', //req.body.body, // plain text body
      html: '<b>NodeJS Email Tutorial</b>' // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
    res.render('/');
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('¡La página no existe!');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next){
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.dev = req.app.get('env') === 'development' ? true : false;
  res.locals.error = res.locals.dev ? err : {};  
  res.status(err.status || 500);
  if(err.status === 500) {
    res.locals.message = '¡Error interno de servidor!'
  }

  // render the error page
  res.render('error', {
    title: 'IPN - Error',
    heroTitle: err.status,
    description: res.locals.message,
    name: 'error',
    dev: res.locals.dev,
    error: err
  });
});

module.exports = app;
