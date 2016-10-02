var $         = require('jquery')
var socket    = io();
global._ = require('lodash');

function Game() {
  this.game = null;
};

Game.prototype.init = function(id){
  socket.on('gameplay_begin_load', (data) => {
    characterId = data.characterId
    map = data.map

    this.game = new Phaser.Game(640, 480, Phaser.AUTO, '', null, false, false, Phaser.Physics.ARCADE);

    this.game.state.add('Preload', require('./state/preload'), false);
    this.game.state.add('Load', require('./state/load'), false);
    this.game.state.add('Gameplay', require('./state/gameplay'), false);
    this.game.state.start('Preload', false, true, {characterId: characterId, socket: socket, dungeon: map.dungeon});
  })
}

global.Game = module.exports = Game