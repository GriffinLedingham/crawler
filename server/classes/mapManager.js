var fs      = require('fs')

function MapManager() {
  this.maps = {}
  this.spawnMaps()
}

MapManager.prototype.spawnMaps = function(){
  console.log('Spawning Map ' + 0)
  this.maps[0] = new Map()
}

MapManager.prototype.getMap = function(id) {
  return this.maps[id]
}

MapManager.prototype.getMapCharactersJSON = function(mapId, serialize) {
  var map = this.getMap(mapId)
  var characters = {}

  var characterIds = map.getCharacters()
  _.each(characterIds, (characterId)=>{
    characters[characterId] = CharacterManager.getCharacterJSON(characterId)
  })

  var monsterIds = map.getMonsters()
  _.each(monsterIds, (monsterId)=>{
    characters[monsterId] = MonsterManager.getMonsterJSON(monsterId)
  })

  var result = characters
  if(typeof serialize != 'undefined' && serialize) result = JSON.stringify(result)
  return result
}

module.exports = new MapManager()