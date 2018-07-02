require('dotenv').config()
const createError   = require('http-errors');
const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const cors          = require('cors')
const jwt           = require('jsonwebtoken')
const app           = express();

const indexRouter   = require('./routes/index')
const todoRouter    = require('./routes/todo')
const userRouter    = require('./routes/user')
const weatherRouter = require('./routes/weather')

//mongoose connection
const mongoose      = require('mongoose')
const dbUrl         = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds247670.mlab.com:47670/todo`;
mongoose.connect(dbUrl, (err) => {
  if(!err) {
    console.log('success connected to database');
  } else {
    console.log('error Connect to database');
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter)
app.use('/todo', todoRouter)
app.use('/user', userRouter)
app.use('/weather', weatherRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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






