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

const Port = new SerialPort(Data.printer.connection.port,
  {
    baudRate: Data.printer.connection.baudrate,
    autoOpen: false,
  },
);

const Parser = new Readline();

const onPortConnectionError = (socket: socketIO.Socket, err: any) => {
  if ([...err.message.matchAll(/Error: No such file or directory, cannot open/gm)].length > 0) return true;
  return false;
};

const onPortWrite = (socket: socketIO.Socket, gcode?: string) => {
  Port.open((err: any) => {
    if (err) {
      const isPortConnectionError = onPortConnectionError(socket, err);
      if (isPortConnectionError) return socket.emit('gcodeResponse', SocketResponse(500, err.message));
    }

    if (gcode) return Port.write(`${gcode}\n`);
    socket.emit('gcodeResponse', SocketResponse(500, 'ok Klipper connected'));
    console.log(gcode);
  });
};

export default (socket: socketIO.Socket) => {
  socket.on('klipper_dash_connection', (message: string) => {
    if (message === 'open') onPortWrite(socket);
  });

  Port.pipe(Parser);

  Parser.on('data', (line: any) => {
    console.log(line);
    socket.emit('gcodeResponse', SocketResponse(200, line));
  });

  socket.on('gcode', (message: string) => {
    onPortWrite(socket, message);
  });

  Port.on('error', (err) => {
    socket.emit('gcodeResponse', SocketResponse(500, err.message));
  });
};
