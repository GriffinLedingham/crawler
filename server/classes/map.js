function Map(id) {
  this.tilemap = require('../data/maps/' + id + '.js')
  this.height = this.tilemap.height
  this.width = this.tilemap.width
  this.tileHeight = this.tilemap.tileHeight
  this.tileWidth = this.tilemap.tileWidth
  this.grid = buildGrid(this.tilemap, this.width, this.height)
  this.characters = []
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
    'tilemap' : this.tilemap,
    'height' : this.height,
    'width' : this.width,
    'tileHeight' : this.tileHeight,
    'tileWidth' : this.tileWidth,
    'grid' : this.grid
  }
  if(typeof serialize != 'undefined' && serialize) result = JSON.stringify(result)
  return result
}

var buildGrid = function(data, width, height){
  var grid = []
  for(var i = 0;i<height;i++) {
    var row = []
    for(var j = 0;j<width;j++) {
      //This needs to be adjusted to hit detect on the hit layer, not the last layer in index
      row.push(data.layers[data.layers.length-1].data[(i*width) + j])
    }
    grid.push(row)
  }
  return grid
}

module.exports = Map