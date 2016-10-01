var $         = require('jquery')
var socket    = io();

function Game() {
  this.game = null;
};

Game.prototype.init = function(id){
  this.bindings = require('./bindings')(socket)

  this.game = new Phaser.Game(640, 480, Phaser.AUTO, '', null, false, false, Phaser.Physics.ARCADE);

  this.game.state.add('Preload', require('./state/preload'), false);
  this.game.state.add('Load', require('./state/load'), false);
  this.game.state.add('Gameplay', require('./state/gameplay'), false);
  this.game.state.start('Preload');
}

global.Game = module.exports = Game