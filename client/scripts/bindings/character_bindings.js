module.exports = function (socket) {
  socket.on('update_character', (data) => {
      console.log(data)
  })
}