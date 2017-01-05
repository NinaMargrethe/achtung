var config = require('./config/config.js');

var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var esession = require('express-session');
var connect = require('connect');
var MongoStore = require('connect-mongo')(esession);

//Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Factory = require('./models/factory.js');
mongoose.connect(config.dburl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("DB connected");
});
var factory = new Factory(Schema, mongoose);
factory.createSchemas();
var testUser = new factory.User({
    username: config.testuser_uname,
    password: config.testuser_pw
})
testUser.save(function (err) {
    if (err) return handleError(err);
    console.log("Testuser saved");
    console.log(""+testUser.password);
})

var index = require('./routes/index');
var users = require('./routes/users');

var sess;

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '/public')));
app.use('/stylesheets',express.static(path.join(__dirname, '/stylesheets')));
app.use('/', index);
//app.use('/users', users);
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('cookie-parser')(config.cookie_secret));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
