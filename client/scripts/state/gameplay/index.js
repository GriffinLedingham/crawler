module.exports = function () {
  let Gameplay = function () {
    this.characterSpritePool = null;
    this.characterManager = null;
    this.charactersInWorld = null;

    this.stateName = 'Gameplay';
  };

  Gameplay.prototype.init = function () {};
  Gameplay.prototype.preload = function () {};
  Gameplay.prototype.create = function () {

    this.characterManager = require('./character_manager')();

    this.characterSpritePool = this.game.add.group();
    for (let i = 0; i < 30; i++) {
      let testsprite = this.game.add.sprite(100, 100, 'test_sheet_image16x32', 16);
      testsprite.animations.add('go', [16, 17], 4, true);
      testsprite.animations.play('go');
      this.characterSpritePool.addChild(testsprite);
      testsprite.kill();
    }

    this.charactersInWorld = {};

    this.game.socket.emit('gameplay_state_ready');

    //this.game.time.add(1000, () => { this.game.socket.emit('update_character', {  }) });

    //this.characterManager.removeCharacter('hip hop');
    //this.removeCharacterFromWorld('hip hop');

  };
  Gameplay.prototype.update = function () {
    this.refreshCharactersInWorld();
  };
  Gameplay.prototype.pushCharacterIntoWorld = function (id) {
    let characterSprite = this.characterSpritePool.getFirstDead();
    characterSprite.revive();
    this.charactersInWorld[id] = characterSprite;
  };
  Gameplay.prototype.removeCharacterFromWorld = function (id) {
    if (this.charactersInWorld[id]) {
      this.charactersInWorld[id].kill();
      delete this.charactersInWorld[id];
    }
  };
  Gameplay.prototype.refreshCharactersInWorld = function () {
    this.characterManager.forEachCharacter((id, character) => {
      if (this.charactersInWorld[id]) {
        this.charactersInWorld[id].x = character.x;
        this.charactersInWorld[id].y = character.y;
      }
    });
  };

  return new Gameplay();
};