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
  if(!this.characters.hasOwnProperty(data.getValue('id'))) return false
  var character = this.characters[data.getValue('id')]
  this.characters[data.getValue('id')] = character.updateData(data)
  io.sockets.emit('update_character', character.getJSON(true))
  return true
}

CharacterManager.prototype.removeCharacter = function(id) {
  console.log(id)
  if(!this.characters.hasOwnProperty(id)) return false
  MapManager.getMap(this.characters[id].getValue('map')).removeCharacter(id)
  delete this.characters[id]
  return true
}

CharacterManager.prototype.getCharactersJSON = function(serialize) {
  var result = this.characters
  if(typeof serialize != 'undefined' && serialize) result = JSON.stringify(result)
  return result
}

CharacterManager.prototype.getCharacterJSON = function(id, serialize) {
  var result = this.characters[id]
  if(typeof serialize != 'undefined' && serialize) result = JSON.stringify(result)
  return result
}

module.exports = new CharacterManager();
