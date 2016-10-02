function CharacterManager() {
  this.characters = {}
};

CharacterManager.prototype.addCharacter = function(character) {
  if(this.characters.hasOwnProperty(character.getValue('id'))) return false
  this.characters[character.getValue('id')] = character
  MapManager.getMap(character.getValue('map')).addCharacter(character)
  return true
}

CharacterManager.prototype.updateCharacter = function(data) {
  if(!this.characters.hasOwnProperty(data['id'])) return false
  var character = this.characters[data['id']]
  this.characters[data['id']] = character.updateData(data)
  io.sockets.emit('update_character', character.getJSON(true))
  return true
}

CharacterManager.prototype.removeCharacter = function(id) {
  console.log(id)
  if(!this.characters.hasOwnProperty(id)) return false
  MapManager.getMap(this.characters[id].getValue('map')).removeCharacter(id)
  delete this.characters[id]
  io.sockets.emit('remove_character', id)
  console.log(this.characters)
  return true
}

CharacterManager.prototype.getCharactersJSON = function(serialize) {
  var result = this.characters
  if(typeof serialize != 'undefined' && serialize) result = JSON.stringify(result)
  return result
}

CharacterManager.prototype.getCharacterJSON = function(id, serialize) {
  var result = this.characters[id].getJSON(serialize)
  return result
}

module.exports = new CharacterManager();
