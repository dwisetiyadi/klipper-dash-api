/**
 * @author Dwi Setiyadi
 */

import socketIO from 'socket.io';
import SocketConsoleModule from '../modules/console/SocketConsole';

let clients: any[] = [];

export const emiter = (message: any) => {
  console.log(message);
};

export default (socket: socketIO.Socket, port: any, parser: any) => {
  console.log(`socketId ${socket.id} connected`);
  clients = [
    ...clients,
    socket,
  ];

  socket.on('end', (client) => {
    socket.disconnect(client);
  });
  socket.on('error', (err) => {
    console.log('Socket.IO Error: ', err.stack);
  });
  socket.on('disconnect', () => {
    clients = clients.filter(item => item !== socket);
    console.log('socket after disconnect: ', clients.length);
    console.log(`socketId ${socket.id} disconnected`);
  });

  // socket on modules
  console.log('current socket: ', clients.length);
  SocketConsoleModule(clients, port, parser);
};
