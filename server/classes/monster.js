var config  = require('../config/map_config')

function Monster(params) {
  Character.call(this, params)
}

Monster.prototype = _.create(Character.prototype, {
  'constructor': Monster
});

Monster.prototype.initMovement = function(mapId) {
  var map = MapManager.getMap(mapId)

  var dirs = ['u','d','l','r']
  var dir = dirs[Math.floor(Math.random()*dirs.length)]
  setInterval(()=>{
    var x_look = 0
    var y_look = 0
    var facing = false
    switch(dir){
      case 'u':
        facing = 'north'
        break;
      case 'd':
        facing = 'south'
        break;
      case 'l':
        facing = 'west'
        break;
      case 'r':
        facing = 'east'
        break;
    }

    switch (facing){
      case 'south':
        this.setValue('y', this.getValue('y') + 5)
        break;
      case 'north':
        this.setValue('y', this.getValue('y') - 5)
        break;
      case 'east':
        this.setValue('x', this.getValue('x') + 5)
        break;
      case 'west':
        this.setValue('x', this.getValue('x') - 5)
        break;
    }

    if (map.dungeon.getMap()[~~((this.getValue('x') + (facing == 'east' ? (config.mapTileSize/2) : facing == 'west' ? 0 : (config.mapTileSize/2) )) / config.mapTileSize)][~~((this.getValue('y') + (facing == 'south' ? (config.mapTileSize*1.5) : facing == 'north' ? 0 : ( 0 ))) / config.mapTileSize)] == 0){
      switch (facing){
        case 'south':
          this.setValue('y', this.getValue('y') - 5)
          break;
        case 'north':
          this.setValue('y', this.getValue('y') + 5)
          break;
        case 'east':
          this.setValue('x', this.getValue('x') - 5)
          break;
        case 'west':
          this.setValue('x', this.getValue('x') + 5)
          break;
      }
      dir = dirs[Math.floor(Math.random()*dirs.length)]
    }
    else {
      if(Math.floor((Math.random() * 10) + 1) > 9)
        dir = dirs[Math.floor(Math.random()*dirs.length)]
    }

    MonsterManager.updateMonster(this.getJSON())

  },25)
}

module.exports = Monster;