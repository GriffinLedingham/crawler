var $         = require('jquery')
var socket    = io();

function Game() {};

Game.prototype.init = function(id){
  console.log(Phaser)
  this.bindings = require('./bindings')(socket)
}

global.Game = module.exports = Game