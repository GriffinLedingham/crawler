module.exports = function () {
  let Load = function () {};

  Load.prototype.init = function () {};
  Load.prototype.preload = function () {
    this.game.load.image('test_sheet_image', 'images/tiles.png');
    this.game.load.spritesheet('test_sheet_image16x32', 'images/tiles.png', 16, 32);
  };
  Load.prototype.create = function () { this.game.state.start('Gameplay'); };

  return new Load();
};