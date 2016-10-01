module.exports = function () {
  let Gameplay = function () {};

  Gameplay.prototype.init = function () {};
  Gameplay.prototype.preload = function () {};
  Gameplay.prototype.create = function () { };
  Gameplay.prototype.update = function () { /**/ };
  Gameplay.prototype.render = function () { this.game.debug.inputInfo(100, 100); };

  return new Gameplay();
};