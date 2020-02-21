/**
 * @author Dwi Setiyadi
 */

import socketIO from 'socket.io';

import { SocketResponse } from '../utilities';

import SocketConsoleModule from '../modules/console/SocketConsole';

export default (socket: socketIO.Socket, port: any) => {

  console.log(`socketId ${socket.id} connected`);

  // socket on modules
  SocketConsoleModule(socket, port);

  socket.on('end', (client) => {
    socket.disconnect(client);
  });
  socket.on('error', (err) => {
    console.log('Socket.IO Error: ', err.stack);
    socket.emit('gcodeResponse', SocketResponse(500, err.stack));
  });
  socket.once('disconnect', () => {
    console.log(`socketId ${socket.id} disconnected`);
  });
};
