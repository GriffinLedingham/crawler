var Promise       = require('bluebird')
var express       = require('express')
var bodyParser    = require("body-parser")
var app           = express()
var http          = require('http').Server(app)
var assert        = require('assert')
var Sequelize     = require('sequelize')
var _             = require('lodash')

var sequelize = new Sequelize('dungeon', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

app.use(express.static('www'))
app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({
  extended: true
}))
http.listen(3000)

global.io         = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('connected')
})

console.log('Server started.')
