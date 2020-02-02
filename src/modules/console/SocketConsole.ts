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

const writeGcode = (socket: socketIO.Socket, port: any, gcode: string) => {
  port.open((err: any) => {
    if (err) {
      socket.emit('gcodeResponse', SocketResponse(500, err.message));
      return;
    }
    if (gcode !== '') {
      port.write(`${gcode}\n`);
    } else {
      socket.emit('gcodeResponse', SocketResponse(200, 'ok serial connected'));
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
    if (message === 'open') writeGcode(socket, Port, '');
  });

  Port.pipe(Parser);

  Parser.on('data', (line: any) => {
    socket.emit('gcodeResponse', SocketResponse(200, line));
  });

  socket.on('gcode', (message: string) => {
    writeGcode(socket, Port, message);
  });

  Port.on('error', (err) => {
    socket.emit('gcodeResponse', SocketResponse(500, err.message));
    console.log(err.message);
  });
};
