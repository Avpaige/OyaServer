module.exports = server => {
    const io = require('socket.io')(server);
    const nsp = io.of("/talk")
    nsp.on('connection', function (socket) {
        console.log('connection');

        socket.on('connection', function (socket) {
            socket.on('chat message', function (msg) {
                io.emit('chat message', msg);
            });
        });

        socket.emit('connected_success')

    });

    io.on('connection', function(socket) {
        console.log('no namespace connection')
    })
}





