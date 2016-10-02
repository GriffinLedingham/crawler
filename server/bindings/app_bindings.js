module.exports = function (socket) {
  socket.on('gameplay_state_ready', (data) => {
    var characterJSON = CharacterManager.getCharacterJSON(socket.characterId)
    var charactersData = MapManager.getMapCharactersJSON(characterJSON.map, true);
    socket.emit('get_all_characters', charactersData);
    socket.broadcast.emit('add_character', CharacterManager.getCharacterJSON(socket.characterId, true))
  })
}