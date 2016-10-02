module.exports = function (socket) {
  socket.on('gameplay_state_ready', (data) => {
    var characterData = CharacterManager.getCharactersJSONAsPlayer(socket.characterId, true);
    socket.emit('get_all_characters', characterData);
    socket.broadcast.emit('add_character', CharacterManager.getCharacterJSON(socket.characterId, true))
  })
}