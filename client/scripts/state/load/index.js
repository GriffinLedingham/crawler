module.exports = function () {
  let Load = function () {};

  Load.prototype.init = function () {};
  Load.prototype.preload = function () {};
  Load.prototype.create = function () { this.game.state.start('Gameplay'); };

  return new Load();
};