/**
 * @author Dwi Setiyadi
 */

import socketIO from 'socket.io';
import SocketConsoleModule from '../modules/console/SocketConsole';

let clients: any;

export default (socket: socketIO.Socket, port: any, parser: any) => {
  console.log(`socketId ${socket.id} connected`);
  clients[socket.id] = socket;

  // socket on modules
  SocketConsoleModule(socket, port, parser);

  socket.on('end', (client) => {
    socket.disconnect(client);
  });
  socket.on('error', (err) => {
    console.log('Socket.IO Error: ', err.stack);
  });
  socket.on('disconnect', () => {
    delete clients[socket.id];
    console.log(`socketId ${socket.id} disconnected`);
  });
};
