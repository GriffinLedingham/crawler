module.exports = function (game, socket) {
  socket.on('update_character', (data) => {
      if (game.state.getCurrentState().stateName === 'Gameplay') {
        var jsonData = JSON.parse(data);
        game.state.getCurrentState().characterManager.refreshCharacter(data.id, data);
      }
  })

  socket.on('get_all_characters', (data) => {

      if (game.state.getCurrentState().stateName === 'Gameplay') {
        var jsonData = JSON.parse(data);

        _.each(jsonData, ((character) => {
          game.state.getCurrentState().characterManager.addCharacter(character.data.id, character.data);
          game.state.getCurrentState().pushCharacterIntoWorld(character.data.id);
        }));
      }
  })

}