var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Import the mongoose module
var mongoose = require('mongoose');
var app = express();

// import MongoDB folder
const db = require('./db');
// Connect to DB
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// ROUTES
var indexRouter = require('./routes/index');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site
var adminRouter = require('./routes/admin');  //Import routes for "admin" area of site

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.
app.use('/admin', adminRouter);  // Add admin routes to middleware chain.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // return error as JSON
  return res.status(500).json({err: err.toString()});
});

module.exports = app;
