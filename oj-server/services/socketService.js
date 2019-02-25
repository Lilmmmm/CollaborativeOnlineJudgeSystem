module.exports = function(io) {
  // singleton, connection event, receive a socket
  io.on('connection', (socket) => {
    console.log(socket);

    var message = socket.handshake.query['message'];
    console.log(message);


    // send back to the client
    // use socket id to specify channel
    io.to(socket.id).emit('message', 'young og');
  });
}
