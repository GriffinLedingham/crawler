function Character(data) {
  this.data = {
    'type': false, //    0 - Player Character, 1 - Enemy Character
    'id'  : guid()
  }

  _.extend(this.data, data)
  return this
};

Character.prototype.init = function(data) {
  this.data     = {}
  _.each(data, (val, key) => {
    this['data'][key] = val
  })

  console.log(this)
}

Character.prototype.getValue = function(key) {
  var result = false
  if(this['data'].hasOwnProperty(key)) result = this['data'][key]
  return result
}

Character.prototype.setValue = function(key, value) {
  this['data'][key] = value
  return value
}

Character.prototype.getJSON = function(serialize) {
  var result = this.data
  if(typeof serialize != 'undefined' && serialize) result = JSON.stringify(result)
  return result
}

Character.prototype.updateData = function (data) {
  this.data = data
  return this
}

module.exports = Character;

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}