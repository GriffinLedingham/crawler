module.exports = function () {
  let Gameplay = function () {
    this.characterSpritePool = null;
    this.characterManager = null;
    this.charactersInWorld = null;
  };

  Gameplay.prototype.init = function () {};
  Gameplay.prototype.preload = function () {};
  Gameplay.prototype.create = function () {

    this.characterManager = require('./character_manager')();

    /*
    // dummy data
    let dummyData = [
      {
        data: {
          type: 0,
          x: 32,
          y: 32,
          id: "heavy metal"
        }
      },{
        data: {
          type: 0,
          x: 64,
          y: 32,
          id: "bluegrass"
        }
      },{
        data: {
          type: 0,
          x: 320,
          y: 240,
          id: "future funk"
        }
      },{
        data: {
          type: 0,
          x: 0,
          y: 0,
          id: "hip hop"
        }
      },
    ];

    dummyData.forEach((d) => {
      this.characterManager.addCharacter(d.data.id, d);
    }); */

    this.characterSpritePool = this.game.add.group();
    for (let i = 0; i < 30; i++) {
      let testsprite = this.game.add.sprite(100, 100, 'test_sheet_image16x32', 16);
      testsprite.animations.add('go', [16, 17], 4, true);
      testsprite.animations.play('go');
      this.characterSpritePool.addChild(testsprite);
      testsprite.kill();
    }

    this.charactersInWorld = {};
    this.characterManager.forEachCharacter((id, character) => {
      this.pushCharacterIntoWorld(id);
    });

    //this.characterManager.removeCharacter('hip hop');
    //this.removeCharacterFromWorld('hip hop');

    //this.game.time.events.loop(2000, () => { this.characterManager.refreshCharacter('future funk', { data: { id: 'future funk', x: Math.random() * this.game.width, y: Math.random() * this.game.height, type: 0 }}); });
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
        this.charactersInWorld[id].x = character.data.x;
        this.charactersInWorld[id].y = character.data.y;
      }
    });
  };

  return new Gameplay();
};