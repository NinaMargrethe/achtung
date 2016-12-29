var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var esession = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var sess;

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '/public')));
app.use('/stylesheets',express.static(path.join(__dirname, '/stylesheets')));
app.use('/', index);
app.use('/users', users);
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(esession({secret: 'boid'})); //TODO remove hard coded secret

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

app.post('/login',function(req,res){
    sess = req.session;
//In this we are assigning uname to session.uname variable.
//uname comes from HTML page.
    sess.uname = req.body.uname;
    res.end('done');
});

app.get('/logout',function(req,res){
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.get('/join',function(req,res){ //Can't join game without logging in
    sess = req.session;
    if(sess.uname) {
        res.write('<h1>Hello '+sess.uname+'</h1>');
        res.end('<a href="+">Logout</a>');
    } else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href="+">Login</a>');
    }
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
