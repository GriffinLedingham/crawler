var fs      = require('fs')

function MapManager() {
  this.maps = {}
  this.spawnMaps()
}

MapManager.prototype.spawnMaps = function(){
  fs.readdir(__dirname + '/../data/maps/', (err, files) => {
    _.each(files,(map, key)=>{
      console.log('Spawning Map ' + key)
      this.maps[key] = new Map(key)
    })
  })
}

MapManager.prototype.getMap = function(id) {
  return this.maps[id]
}

module.exports = new MapManager()