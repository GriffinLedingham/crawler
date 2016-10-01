module.exports = function (socket) {
  socket.on('update_character', (data) => {
    CharacterManager.updateCharacter(JSON.parse(data))
  })

  socket.on('get_all_characters', () => {
    socket.emit('get_all_characters', CharacterManager.getCharactersJSON(true))
  })

  socket.on('disconnect', () => {
    CharacterManager.removeCharacter(socket.characterId)
  })
}