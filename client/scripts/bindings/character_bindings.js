module.exports = function (socket) {
  socket.on('update_character', (id, data) => {
      console.log(id)
      console.log(data)
  })
}