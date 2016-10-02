var $         = require('jquery')
global._ = require('lodash');

function Game() {
  this.game = null;
};

Game.prototype.init = function(id){

  this.game = new Phaser.Game(640, 480, Phaser.AUTO, '', null, false, false, Phaser.Physics.ARCADE);

  this.game.state.add('Preload', require('./state/preload'), false);
  this.game.state.add('Load', require('./state/load'), false);
  this.game.state.add('Gameplay', require('./state/gameplay'), false);
  this.game.state.start('Preload');

  this.game.socket = io();
  this.bindings = require('./bindings')(this.game, this.game.socket); 
}

global.Game = module.exports = Game