module.exports = function (socket) {
  socket.on('create_character', (data) => {
    character_model.createCharacter(data)
    .then((response) => {
      console.log(response)
    })
  })

  socket.on('update_character', (id, data) => {
    //This will be conditional whether to write to the DB or not on each update
    var save = false

    if(save) {
      character_model.updateCharacter(id, data)
      .then((response) => {
        console.log(response)
      })
    }
    socket.broadcast.emit('update_character', id, data)
  })

  socket.on('get_character', (id) => {
    character_model.getCharacter(id)
    .then((response) => {
      console.log(response)
    })
  })
}