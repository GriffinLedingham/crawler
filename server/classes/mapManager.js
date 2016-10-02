var fs      = require('fs')

function MapManager() {
  this.maps = {}
  this.spawnMaps()
}

MapManager.prototype.spawnMaps = function(){
  for(var i = 0;i<2;i++){
    console.log('Spawning Map ' + i)
    this.maps[i] = new Map()
  }
}

MapManager.prototype.getMap = function(id) {
  return this.maps[id]
}

module.exports = new MapManager()