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

const onPortError = (socket: socketIO.Socket, err: any, code?: number) => {
  if (err) {
    if ([...err.message.matchAll(/Port is already open/gm)].length > 0) return false;
    socket.emit('gcodeResponse', SocketResponse(code || 500, err.message));
    return true;
  }

  return false;
};

const onPortWrite = (socket: socketIO.Socket, port: any, gcode?: string) => {
  port.open((err: any) => {
    const isError = onPortError(socket, err);
    if (!isError) {
      if (!gcode) {
        socket.emit('gcodeResponse', SocketResponse(200, 'ok serial connected'));
        return;
      }

      port.write(`${gcode}\n`);
    }
  });
};

export default (socket: socketIO.Socket) => {
  const Port = new SerialPort(Data.printer.connection.port,
    {
      baudRate: Data.printer.connection.baudrate,
      autoOpen: false,
    },
  );
  const Parser = new Readline();

  socket.on('klipper_dash_connection', (message: string) => {
    if (message === 'open') onPortWrite(socket, Port);
  });

  Port.pipe(Parser);

  Parser.on('data', (line: any) => {
    socket.emit('gcodeResponse', SocketResponse(200, line));
  });

  socket.on('gcode', (message: string) => {
    onPortWrite(socket, Port, message);
  });

  Port.on('error', (err) => {
    socket.emit('gcodeResponse', SocketResponse(500, err.message));
  });
};
