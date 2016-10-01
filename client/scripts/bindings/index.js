module.exports = function (socket) {
  return {
    character_bindings: require('./character_bindings')(socket)
  };
}