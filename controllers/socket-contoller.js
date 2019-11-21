module.exports = server => {
    const io = require('socket.io')(server);
    const nsp = io.of("/talk")

    room = ""
    msg=""

    io.sockets.on('connection', function (socket) {
        socket.on('join', function (room) {
            socket.join(room);
            socket.emit('room joined')
        });
    });

    io.sockets.on('connection', function (socket) {
        socket.on('leave', function (room) {
            socket.leave(room);
            socket.emit('room left')
        });
    });


    io.sockets.in(room).emit('message', msg);

    nsp.on('connection', function (socket) {
        console.log('connection');

        socket.on('connection', function (socket) {
            socket.on('chat message', function (msg) {
                io.emit('chat message', msg);
            });
        });

        socket.emit('connected_success')

    });

    io.on('connection', function (socket) {
        console.log('no namespace connection')
    })
}





