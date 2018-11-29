'use strict'

var express = require('express')
var morgan = require('morgan')
var path = require('path')
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

var config = require('./app/config.js')

var db = mongoose.connect(config.DB, function(error){
    if(error) console.log(error);

        console.log("connection successful");
});



app.use(express.static(path.join(__dirname, '/public')))

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var port = config.APP_PORT | 4000
app.listen(port)

console.log('App listening on port ' + port)

var todoRoutes = require('./app/routes.js')

app.use('/api', todoRoutes)

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