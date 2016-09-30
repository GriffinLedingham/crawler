var fs      = require('fs')

module.exports = function (socket) {
  var bindings = {}
  fs.readdir(__dirname, function(err, files){
    var bindingNames = []
    for(index in files) {
      if(files[index].indexOf('.js') !== -1 && files[index].indexOf('index.js') === -1) bindingNames.push(files[index])
    }

    for(index in bindingNames) {
      bindings[bindingNames[index]] = require("./"+bindingNames[index])(socket)
    }
  })

  return bindings;
}