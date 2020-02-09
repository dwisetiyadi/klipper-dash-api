/**
 * @author Dwi Setiyadi
 */

import socketIO from 'socket.io';

import {
  SocketResponse,
} from '../../utilities';

export default (socket: socketIO.Socket, port: any, parser: any) => {
  parser.on('data', (line: any) => {
    console.log(line);
    socket.emit('gcodeResponse', SocketResponse(200, line));
  });
  socket.on('gcode', (message: string) => {
    port.write(`${message}\n`);
  });
};
