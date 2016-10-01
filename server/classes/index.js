var fs      = require('fs')

module.exports = function (socket) {
  var classes = {}
  fs.readdir(__dirname, function(err, files){
    var classNames = []
    for(index in files) {
      if(files[index].indexOf('.js') !== -1 && files[index].indexOf('index.js') === -1) classNames.push(files[index])
    }

    for(index in classNames) {
      classes[classNames[index][0].toUpperCase() + classNames[index].slice(1).replace('.js','')] = module.exports = require("./"+classNames[index])
      global[classNames[index][0].toUpperCase() + classNames[index].slice(1).replace('.js','')] = classes[classNames[index][0].toUpperCase() + classNames[index].slice(1).replace('.js','')]
    }
  })

  return classes;
}