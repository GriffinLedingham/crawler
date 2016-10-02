function Map(id) {
  this.characters = []

  var map_size = 50;

  this.dungeon = new Dungeon()
  this.dungeon.generate(map_size);
  var map = this.dungeon.getMap();
  var rooms = this.dungeon.getRooms();
  var stats = this.dungeon.getStats();
  this.dungeon.print();
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

Map.prototype.getJSON = function(serialize){
  var result = {
    dungeon: this.dungeon
  }
  if(typeof serialize != 'undefined' && serialize) result = JSON.stringify(result)
  return result
}

module.exports = Map
