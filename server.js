'use strict'

var express = require('express')
var morgan = require('morgan')
var path = require('path')
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

//viikko 10: autentikaatio passportilla
var passport = require('passport')
var flash    = require('connect-flash')
var session  = require('express-session')
var cookieParser = require('cookie-parser');


var config = require('./app/config.js')

var db = mongoose.connect(config.DB, function(error){
    if(error) console.log(error);

        console.log("connection successful");
});

require('./app/passport')(passport)
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '/public')))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({ secret: 'asddghertg34thg25y' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./app/auth-routes')(app, passport)


var port = config.APP_PORT | 4000
app.listen(port)

console.log('App listening on port ' + port)

var todoRoutes = require('./app/routes.js')
//var authRoutes = require('./app/auth-routes.js')

app.use('/api', todoRoutes)
//app.use('/auth', authRoutes)

app.use(function (req, res, next) {
    // Website you wish to allow to connect
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port)

    // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Pass to next layer of middleware
  next()
})

// Server index.html page when request to the root is made
app.get('/', function (req, res, next) {
    res.sendfile('./public/index.html')
  })