/**
 * @author Dwi Setiyadi
 */

import socketIO from 'socket.io';
import SocketConsoleModule from '../modules/console/SocketConsole';

export default (socket: socketIO.Socket) => {
  socket.setMaxListeners(100);
  console.log(`socketId ${socket.id} connected`);

  // socket on modules
  SocketConsoleModule(socket);

  socket.on('end', (client) => {
    socket.disconnect(client);
  });
  socket.on('error', (err) => {
    console.log('Socket.IO Error: ', err.stack);
  });
  socket.on('disconnect', () => {
    console.log(`socketId ${socket.id} disconnected`);
  });
};
