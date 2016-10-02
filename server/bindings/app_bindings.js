module.exports = function (socket) {
  socket.on('gameplay_state_ready', (data) => {
    socket.emit('get_all_characters', CharacterManager.getCharactersJSON(true))
  })
}