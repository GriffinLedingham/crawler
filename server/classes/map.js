var config  = require('../config/map_config')

function Map(id) {
  this.characters = []
  this.monsters    = []

  var map_size = 50;

  this.dungeon = new Dungeon()
  this.dungeon.generate(map_size);
  var map = this.dungeon.getMap();
  var rooms = this.dungeon.getRooms();
  var stats = this.dungeon.getStats();
  this.dungeon.print();

  setTimeout(()=>{
    for(var i = 0;i<25;i++){
      var room = rooms[Math.floor(Math.random()*rooms.length)]
      var character = new Monster({
        'type'  :0,
        'x'     : room.center.x * config.mapTileSize,
        'y'     : room.center.y * config.mapTileSize,
        'map'   : '0'
      })

      MonsterManager.addMonster(character)
    }
  },2000)
}

Map.prototype.addCharacter = function(character){
  if(this.characters.indexOf(character.getValue('id')) != -1) return false
  this.characters.push(character.getValue('id'))
  return true
}

Map.prototype.removeCharacter = function(characterId){
  if(this.characters.indexOf(characterId) == -1) return false
  this.characters = _.without(this.characters, characterId)
  return true
}

Map.prototype.getCharacters = function(){
  return this.characters
}

Map.prototype.getMonsters = function(){
  return this.monsters
}

Map.prototype.addMonster = function(character){
  if(this.characters.indexOf(character.getValue('id')) != -1) return false
  this.monsters.push(character.getValue('id'))
  character.initMovement(character.getValue('map'))
  return true
}

Map.prototype.getJSON = function(serialize){
  var result = {
    dungeon: this.dungeon
  }
  if(typeof serialize != 'undefined' && serialize) result = JSON.stringify(result)
  return result
}

module.exports = Map
