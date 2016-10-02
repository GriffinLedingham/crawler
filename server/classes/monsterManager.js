function MonsterManager() {}

MonsterManager.prototype.spawnMonster = function(mapId){
  var monster = new Monster({
    'type'  : 1,
    'x'     : 64,
    'y'     : 64,
    'map'   : '0'
  })
}

MonsterManager.prototype.getMap = function(id) {
  return this.maps[id]
}

module.exports = new MonsterManager()