module.exports = function (socket) {
  socket.on('update_character', (data) => {
    CharacterManager.updateCharacter(JSON.parse(data))
  })

  socket.on('get_all_characters', (mapId) => {
    socket.emit('get_all_characters', MapManager.getMapCharactersJSON(mapId, true))
  })

  socket.on('disconnect', () => {
    CharacterManager.removeCharacter(socket.characterId)
  })
}