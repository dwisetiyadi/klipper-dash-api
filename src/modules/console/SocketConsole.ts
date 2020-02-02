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
  const Port = new SerialPort(Data.printer.connection.port,
    {
      baudRate: Data.printer.connection.baudrate,
      autoOpen: false,
    },
  );
  const Parser = new Readline();

  socket.on('klipper_dash_connection', (message: string) => {
    if (message === 'open') {
      Port.open((err) => {
        if (err) {
          socket.emit('gcodeResponse', SocketResponse(500, err.message));
          return;
        }
        socket.emit('gcodeResponse', SocketResponse(200, 'ok serial connected'));
      });
    }
  });

  Port.pipe(Parser);

  Parser.on('data', (line: any) => {
    socket.emit('gcodeResponse', SocketResponse(200, line));
  });

  socket.on('gcode', (message: string) => {
    Port.on('open', () => {
      Port.write(`${message}\n`);
    });
  });

  Port.on('error', (err) => {
    socket.emit('gcodeResponse', SocketResponse(500, err.message));
    console.log(err.message);
  });
};
