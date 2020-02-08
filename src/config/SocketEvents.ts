/**
 * @author Dwi Setiyadi
 */

import socketIO from 'socket.io';
import SocketConsoleModule from '../modules/console/SocketConsole';

const allClients: any[] = [];

export default (socket: socketIO.Socket, port: any, parser: any) => {
  console.log(`socketId ${socket.id} connected`);
  allClients.push(socket);

  // socket on modules
  SocketConsoleModule(socket, port, parser);

  socket.on('end', (client) => {
    socket.disconnect(client);
  });
  socket.on('error', (err) => {
    console.log('Socket.IO Error: ', err.stack);
  });
  socket.on('disconnect', () => {
    console.log(`socketId ${socket.id} disconnected`);
    const i = allClients.indexOf(socket);
    allClients.splice(i, 1);
    console.log(allClients);
  });
};
