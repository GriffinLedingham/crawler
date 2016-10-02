var Promise       = require('bluebird')
var express       = require('express')
var bodyParser    = require("body-parser")
var app           = express()
var http          = require('http').Server(app)
var assert        = require('assert')
var Sequelize     = require('sequelize')
var config        = require('./config/db_config');
global._          = require('lodash')

var sequelize = new Sequelize(config.db_name, config.username, config.password, {
  host: config.hostname,
  dialect: config.dialect,
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

global.io       = require('socket.io')(http);

var models      = require('./models')(sequelize)
var classes   = require('./classes')()

io.on('connection', (socket) => {
  console.log('Connection.')

  socket.bindings = require('./bindings')(socket)

  var character = new Character({
    'type'  :0,
    'x'     : 64,
    'y'     : 64,
    'map'   : '0'
  })

  socket.characterId = character.getValue('id')
  CharacterManager.addCharacter(character)

  socket.emit('gameplay_begin_load', socket.characterId)
})

console.log('Server started.')
