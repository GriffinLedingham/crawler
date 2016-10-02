module.exports = function (game, socket) {
  return {
    character_bindings: require('./character_bindings')(game, socket)
  };
}