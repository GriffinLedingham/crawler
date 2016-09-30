var config  = require('../config/model_config');
var fs      = require('fs')

module.exports = function (db) {
  var models = {}
  fs.readdir(__dirname, function(err, files){
    var modelNames = []
    for(index in files) {
      if(files[index].indexOf('.js') !== -1 && files[index].indexOf('index.js') === -1) modelNames.push(files[index])
    }

    for(index in modelNames) {
      models[modelNames[index]] = require("./"+modelNames[index])(db)
    }

    for(key in models) {
      if ("associate" in models[key]) {
        models[key].associate()
        global[key.replace('.js','')] = module.exports = models[key]
      }
    }

    db.sync({force: config.forceSync})
  })
}