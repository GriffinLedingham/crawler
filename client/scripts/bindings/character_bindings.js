module.exports = function (game, socket) {
  socket.on('update_character', (data) => {
    if ( typeof game.state.getCurrentState() !== 'undefined' && game.state.getCurrentState().stateName === 'Gameplay') {
      var jsonData = JSON.parse(data);

      if (jsonData && jsonData.id !== game.state.getCurrentState().currentPlayerKey) {
        game.state.getCurrentState().characterManager.refreshCharacter(jsonData.id, jsonData);
      }
    }
  })

  socket.on('add_character', (data) => {
    var jsonData = JSON.parse(data);
    if (jsonData && game.state.getCurrentState().stateName === 'Gameplay') {
      game.state.getCurrentState().characterManager.addCharacter(jsonData.id, jsonData);
      game.state.getCurrentState().pushCharacterIntoWorld(jsonData.id);
    }
  })

  socket.on('remove_character', (id) => {
    if (game.state.getCurrentState().stateName === 'Gameplay') {
      game.state.getCurrentState().characterManager.removeCharacter(id);
      game.state.getCurrentState().removeCharacterFromWorld(id);
    }
  })

  socket.on('get_all_characters', (data) => {
    if (game.state.getCurrentState().stateName === 'Gameplay') {
      var jsonData = JSON.parse(data);
      _.each(jsonData, ((character, key) => {
        game.state.getCurrentState().characterManager.addCharacter(character.id, character);
        game.state.getCurrentState().pushCharacterIntoWorld(character.id);
      }));
    }
  })

}