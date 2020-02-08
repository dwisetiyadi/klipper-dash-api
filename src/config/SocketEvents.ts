/**
 * @author Dwi Setiyadi
 */

import socketIO from 'socket.io';
import SocketConsoleModule from '../modules/console/SocketConsole';

const connections = new Set();

export default (socket: socketIO.Socket, port: any, parser: any) => {
  console.log(`socketId ${socket.id} connected`);
  connections.add(socket);

  // socket on modules
  SocketConsoleModule(socket, port, parser);

  socket.on('end', (client) => {
    socket.disconnect(client);
  });
  socket.on('error', (err) => {
    console.log('Socket.IO Error: ', err.stack);
  });
  socket.once('disconnect', () => {
    connections.delete(socket);
    console.log(`socketId ${socket.id} disconnected`);
  });
};
