require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var uglifyJs = require("uglify-js");
var fs = require('fs');
var passport = require('passport');

require('./app_api/models/db');
require('./app_api/config/passport');

//var indexRouter = require('./app_server/routes/index');
//var usersRouter = require('./app_server/routes/users');

var routesApi = require('./app_api/routes/index');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle all API call.
app.use('/api', routesApi);

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

var appClientFiles = [
  'app_client/app.js',
  'app_client/home/home.controller.js',
  'app_client/about/about.controller.js',
  'app_client/locationDetail/locationDetail.controller.js',
  'app_client/reviewModal/reviewModal.controller.js',
  'app_client/auth/register/register.controller.js',
  'app_client/auth/login/login.controller.js',
  'app_client/common/services/geolocation.service.js',
  'app_client/common/services/loc8rData.service.js',
  'app_client/common/services/authentication.service.js',
  'app_client/common/filters/formatDistance.filter.js',
  'app_client/common/filters/addHtmlLineBreaks.filter.js',
  'app_client/common/directives/ratingStars/ratingStars.directive.js',
  'app_client/common/directives/header/header.directive.js',
  'app_client/common/directives/navigation/navigation.directive.js',
  'app_client/common/directives/navigation/navigation.controller.js',
  'app_client/common/directives/footerGeneric/footerGeneric.directive.js'
];

var filesContents = appClientFiles.map(function (file) {
  return fs.readFileSync(file, 'utf8');
})

var uglified = uglifyJs.minify(filesContents, { compress: false });
fs.writeFile('public/angular/loc8r.min.js', uglified.code, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Script generated and saved: loc8r.min.js');
  }
});

app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(passport.initialize());

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});
//app.use('/', indexRouter);
//app.use('/users', usersRouter);

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ "message": err.name + ": " + err.message });
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
