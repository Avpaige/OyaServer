// module.exports = server => {
//     const io = require('socket.io')(server);
//     const nsp = io.of("/talk")
//     nsp.on('connection', function (socket) {
//         console.log('connection');

//         socket.on('chat message', function (msg) {
//             socket.broadcast.emit('broadcast', msg);
//         });

//         socket.emit('connected_success')

//     });

//     io.on('connection', function (socket) {
//         console.log('no namespace connection')
//     })


// }
module.exports = server => {
    const io = require('socket.io')(server);
    const nsp = io.of("/talk")
    let rooms = []

    nsp.on('connection', function (socket) {
        socket.emit('connected_success')

        socket.on('room', (room) => {
            socket.join(room);
            rooms.push(room);
        });

        socket.on('chat message', (data) => {
            const { room, message } = data
            console.log('got message', message);
            socket.broadcast.to(room).emit('broadcast', message);
        });

<<<<<<< HEAD
        socket.on('disconnection', (room) => {

            socket.leave(room);
            var i = rooms.indexOf(room);
            rooms.splice(i, 1);
        });
=======
        // socket.on('disconnect', function (socket) {
        //     console.log(socket)
        //     socket.emit('disconnection', function (room) {
        //         // socket.leave(room);
        //         // var i = rooms.indexOf(room);
        //         // rooms.splice(i, 1);
        //     });
        // });
>>>>>>> f67fcc07eee1455e34b6c51bb60e0af28a362fe2
    });

    io.on('connection', function (socket) {
        console.log('no namespace connection')
    })
}