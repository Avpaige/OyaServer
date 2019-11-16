const socketIO = require("socket.io");

class OyaRooms {
    constructor(http, rooms) {
        this.io = socketIO(http);
        this.namespace = this.io.of(`/avail/chat`);
        this.chatRooms= [1,2,3,4,5,6,7,8,9,10];
        this.rooms=rooms;
    }

    assignChatRoomNames() {
        return new Promise((resolve, reject) => {
            this.rooms().then((rooms) => {
                this.chatRooms = rooms;
                resolve();  
            }).catch((error) => {
                reject(error);
            });
        });
    }

    assignChatRoomsSockets() {
        return new Promise((resolve, reject) => {
            this.assignChatRoomNames().then(() => {
                this.namespace.on("connection", (socket) => {
                    for (const room of this.rooms) {
                        socket.on(room, (message) => {
                            if (message.isJoinLeave === false) {
                                
                            }
                            this.namespace.emit(room, message);
                        });
                    }
                });
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    }
}


module.exports = OyaRooms;