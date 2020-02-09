/**
 * @author Dwi Setiyadi
 */

import socketIO from 'socket.io';
import SerialPort from 'serialport';
import Readline from '@serialport/parser-readline';
import * as Data from '../../config/Application.json';

import {
  SocketResponse,
} from '../../utilities';

export default (socket: socketIO.Socket) => {
  const port = new SerialPort(Data.printer.connection.port,
    {
      baudRate: Data.printer.connection.baudrate,
      autoOpen: false,
    },
  );
  const parser = new Readline();
  const onPortConnectionError = (socket: socketIO.Socket, err: any) => {
    if ([...err.message.matchAll(/Error: No such file or directory, cannot open/gm)].length > 0) return true;
    return false;
  };
  const onPortWrite = (socket: socketIO.Socket, gcode?: string) => {
    port.open((err: any) => {
      if (err) {
        const isPortConnectionError = onPortConnectionError(socket, err);
        if (isPortConnectionError) {
          socket.emit('gcodeResponse', SocketResponse(500, err.message));
          return;
        }
      }
  
      if (gcode) {
        console.log(gcode);
        port.write(`${gcode}\n`);
        return;
      }
  
      socket.emit('gcodeResponse', SocketResponse(500, 'ok Klipper connected'));
      console.log(gcode);
    });
  };

  socket.on('klipper_dash_connection', (message: string) => {
    if (message === 'open') onPortWrite(socket);
  });

  port.pipe(parser);

  parser.on('data', (line: any) => {
    socket.emit('gcodeResponse', SocketResponse(200, line));
  });

  socket.on('gcode', (message: string) => {
    onPortWrite(socket, message);
  });

  port.on('error', (err: any) => {
    socket.emit('gcodeResponse', SocketResponse(500, err.message));
  });
};
