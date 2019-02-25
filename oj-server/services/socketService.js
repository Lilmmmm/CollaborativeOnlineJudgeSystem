module.exports = function(io) {
  // collaboration session
  var collaborations = [];

  // map from socketId to sessionId
  var socketIdToSessionId = [];


  // io is a singleton, connection event, receive a socket
  io.on('connection', (socket) => {
    let sessionId = socket.handshake.query['sessionId'];

    socketIdToSessionId[socket.id] = sessionId;

    // add socket.id to corresponding collaboration session participants
    if (!(sessionId in collaborations)) {
      collaborations[sessionId] = {
        'participants': []
      };
    }

    collaborations[sessionId]['participants'].push(socket.id);

    // socket event listeners
    socket.on('change', delta => {
      console.log("change " + socketIdToSessionId[socket.id] + " " + delta);
      let sessionId = socketIdToSessionId[socket.id];
      if (sessionId in collaborations) {
        let participants = collaborations[sessionId]['participants'];
        for (let i = 0; i < participants.length; i++) {
          if (socket.id != participants[i]) {
            io.to(participants[i]).emit("change", delta);
          }
        }
      } else {
        console.log("WARNING: could not tie socket_id to any collaboration");
      }
    });
    var message = socket.handshake.query['message'];
    console.log(message);


    // send back to the client
    // use socket id to specify channel
    io.to(socket.id).emit('message', 'young og');
  });
}
