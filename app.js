var createError = require('http-errors');
var express = require('express');
const port = process.env.PORT || 4000
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');
var customerRouter = require('./routes/customer');

var app = express();
//Import body-parser library to get input from client
var bodyParser = require('body-parser');
//Config body-parser library
app.use(bodyParser.urlencoded({ extended: false }));

//Import Mongoose library
var mongoose = require('mongoose');
//Config database connection and Database name
var database = "mongodb+srv://hungbqgch211022:3fF63V8fNmRCV60P@cluster0.6qptrp7.mongodb.net/ATN";

//Connect to Database
mongoose.connect(database)
    .then(() => console.log("Successfully connected to the DB."))
    .catch((err) => console.error("Failed to connect to DB. Error: " + err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/customer', customerRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Error page render
  res.status(err.status || 500);
  res.render('error');
});

// Listen on a dynamic port assigned by the environment or default to 3000
var server = app.listen(process.env.PORT || 3001, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});

module.exports = app;
