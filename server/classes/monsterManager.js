function MonsterManager() {
  this.monsters = {}
}

MonsterManager.prototype.addMonster = function(character){
  if(this.monsters.hasOwnProperty(character.getValue('id'))) return false
  this.monsters[character.getValue('id')] = character
  MapManager.getMap(character.getValue('map')).addMonster(character)
  io.sockets.emit('add_character', this.getMonsterJSON(character.getValue('id'), true))
  return true
}

MonsterManager.prototype.updateMonster = function(data) {
  if(!this.monsters.hasOwnProperty(data['id'])) return false
  var character = this.monsters[data['id']]
  this.monsters[data['id']] = character.updateData(data)
  io.sockets.emit('update_character', character.getJSON(true))
  return true
}

MonsterManager.prototype.getMonsterJSON = function(id, serialize) {
  var result = this.monsters[id].getJSON(serialize)
  return result
}

MonsterManager.prototype.getMap = function(id) {
  return this.maps[id]
}

module.exports = new MonsterManager()