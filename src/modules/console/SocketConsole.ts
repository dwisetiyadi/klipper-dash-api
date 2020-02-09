/**
 * @author Dwi Setiyadi
 */

import socketIO from 'socket.io';

import {
  SocketResponse,
} from '../../utilities';

const onPortConnectionError = (socket: socketIO.Socket, err: any) => {
  if ([...err.message.matchAll(/Error: No such file or directory, cannot open/gm)].length > 0) return true;
  return false;
};

const onPortWrite = (socket: socketIO.Socket, port: any, gcode?: string) => {
  port.open((err: any) => {
    if (err) {
      const isPortConnectionError = onPortConnectionError(socket, err);
      if (isPortConnectionError) return socket.broadcast.emit('gcodeResponse', SocketResponse(500, err.message));
    }

    if (gcode) return port.write(`${gcode}\n`);
    socket.broadcast.emit('gcodeResponse', SocketResponse(500, 'ok Klipper connected'));
    console.log(gcode);
  });
};

export default (socket: socketIO.Socket, port: any, parser: any) => {
  socket.on('klipper_dash_connection', (message: string) => {
    if (message === 'open') onPortWrite(socket, port);
  });

  port.pipe(parser);

  parser.on('data', (line: any) => {
    console.log(line);
    socket.broadcast.emit('gcodeResponse', SocketResponse(200, line));
  });

  socket.on('gcode', (message: string) => {
    onPortWrite(socket, port, message);
  });

  port.on('error', (err: any) => {
    socket.broadcast.emit('gcodeResponse', SocketResponse(500, err.message));
  });
};
