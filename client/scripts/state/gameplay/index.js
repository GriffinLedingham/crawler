module.exports = function () {
  let Gameplay = function () {
    this.characterSpritePool = null;
    this.characterManager = null;
    this.charactersInWorld = null;

    this.currentPlayerKey = null;

    this.stateName = 'Gameplay';
  };

  Gameplay.prototype.init = function (params) {
    this.currentPlayerKey = params.characterId
    this.socket = params.socket
  };
  Gameplay.prototype.preload = function () {};
  Gameplay.prototype.create = function () {

    this.characterManager = require('./character_manager')();

    this.characterSpritePool = this.game.add.group();
    for (let i = 0; i < 30; i++) {
      let testsprite = this.game.add.sprite(100, 100, 'test_sheet_image16x32', 16);
      testsprite.animations.add('go', [16, 17], 4, true);
      testsprite.animations.play('go');
      this.game.physics.enable(testsprite, Phaser.Physics.ARCADE);

      this.characterSpritePool.addChild(testsprite);
      testsprite.kill();
    }

    this.charactersInWorld = {};

    this.game.bindings = require('./../../bindings')(this.game, this.socket)
    this.socket.emit('gameplay_state_ready');

    //this.game.time.add(1000, () => { this.game.socket.emit('update_character', {  }) });

    //this.characterManager.removeCharacter('hip hop');
    //this.removeCharacterFromWorld('hip hop');

  };
  Gameplay.prototype.update = function () {
    let playerSprite = this.charactersInWorld[this.currentPlayerKey];

    if (playerSprite) {
      let HACK_WalkSpeed = 100;

      let playerMoved = false;

      if (this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
        playerSprite.body.velocity.x = HACK_WalkSpeed;
        playerMoved = true;
      } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
        playerSprite.body.velocity.x = -HACK_WalkSpeed;
        playerMoved = true;
      } else {
        playerSprite.body.velocity.x = 0;
      }

      if (this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
        playerSprite.body.velocity.y = HACK_WalkSpeed;
        playerMoved = true;
      } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
        playerSprite.body.velocity.y = -HACK_WalkSpeed;
        playerMoved = true;
      } else {
        playerSprite.body.velocity.y = 0;
      }

      if (playerMoved) {
        this.characterManager.getCharacterById(this.currentPlayerKey).x = playerSprite.x;
        this.characterManager.getCharacterById(this.currentPlayerKey).y = playerSprite.y;

        this.socket.emit( 'update_character', JSON.stringify(this.characterManager.getCharacterById(this.currentPlayerKey)) );
      }
    }

    this.refreshCharactersInWorld();
  };
  Gameplay.prototype.pushCharacterIntoWorld = function (id) {
    let characterSprite = this.characterSpritePool.getFirstDead();
    characterSprite.revive();
    this.charactersInWorld[id] = characterSprite;
    characterSprite.x = this.characterManager.getCharacterById(id).x;
    characterSprite.y = this.characterManager.getCharacterById(id).y;
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