module.exports = function (socket) {
  socket.on('get_map', (id) => {
    socket.emit('get_map', MapManager.getMap(id).getJSON(true))
  })
}