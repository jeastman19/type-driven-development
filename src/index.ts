import { DisconnectedSocket, Socket } from "./sockets";

console.clear();

let socket: Socket = new DisconnectedSocket();
console.log(socket.constructor.name);
console.log();

console.log("Antes de conectar el socket");
console.log();

socket = socket.connect();
console.log(socket.constructor.name);
console.log();

socket.emit("saludo");
console.log();

socket = socket.disconnect();
console.log(socket.constructor.name);
