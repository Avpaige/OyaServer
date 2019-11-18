// const socketIO = require("socket.io");
// const mongoController = require("./mongo-controller")

// class OyaRooms {
//     constructor(http, rooms) {
//         this.io = socketIO(http);
//         this.namespace = this.io.of(`/avail/chat`);
//         this.socket=socket;
//     }

//     leaveRoom(){
//     io.on('connection', function(socket){
//         socket.leave(roomNum);
//       });
//     }

//     joinRoom(){
//         io.on('connection', function(socket){
//             socket.join(roomNum);
//           });
//         }

//     assignChatRoomsSockets() {
//         return new Promise((resolve, reject) => {
//             this.assignChatRoomNames().then(() => {
//                 this.namespace.on("connection", (socket) => {
//                     for (const room of this.rooms) {
//                         socket.on(room, (message) => {
//                            this.namespace.emit(room, message);
//                         });
//                     }
//                 });
//                 resolve();
//             }).catch((error) => {
//                 reject(error);
//             });
//         });
//     }
// }


// module.exports = OyaRooms;