module.exports = function () {
  let Gameplay = function () {
    this.characterSpritePool = null;
    this.characterManager = null;
    this.charactersInWorld = null;

    this.currentPlayerKey = null;

    this.map = null;
    this.foreground = null;
    this.background = null;

    this.stateName = 'Gameplay';
  };

  Gameplay.prototype.init = function (params) {
    this.currentPlayerKey = params.characterId
    this.socket = params.socket
    this.mapdata = params.dungeon;
  };
  Gameplay.prototype.preload = function () {};
  Gameplay.prototype.create = function () {

    this.map = this.game.add.tilemap();
    this.map.addTilesetImage('tiles', 'dungeon_tiles', 32, 32);
    this.foreground = this.map.create('foreground', this.mapdata.map_size, this.mapdata.map_size, 32, 32)
    this.foreground.resizeWorld();

    var tilespriteMap = tileMapTranslate(this.mapdata.map);
    for (let i = 0; i < this.mapdata.map_size; i++) {
      for (let j = 0; j < this.mapdata.map_size; j++) {
        this.map.putTile(tilespriteMap[i][j], i, j, this.foreground);
      }
    }


    this.map.setCollision([
        tileLibrary.blank,
        tileLibrary.wallface,tileLibrary.wallface_e,tileLibrary.wallface_w, tileLibrary.wallface_cntr,
        tileLibrary.walltop,tileLibrary.walltop_e,tileLibrary.walltop_w, tileLibrary.walltop_cntr]);

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

    this.game.time.events.loop(30, () => {
      if (this.charactersInWorld[this.currentPlayerKey]) {
        this.socket.emit( 'update_character', JSON.stringify(this.characterManager.getCharacterById(this.currentPlayerKey)) );
      }
    });

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
      }

      this.game.physics.arcade.collide(playerSprite, this.foreground);

      if (this.game.camera.target === null) {
        this.game.camera.follow(playerSprite);
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