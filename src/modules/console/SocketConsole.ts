/**
 * @author Dwi Setiyadi
 */

import socketIO from 'socket.io';

export default (socket: socketIO.Socket, port: any) => {
  socket.on('gcode', (message: string) => {
    port.write(`${message}\n`);
  });
};
