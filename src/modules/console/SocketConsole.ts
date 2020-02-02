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

const onPortError = (socket: socketIO.Socket, err: any) => {
  if (err) {
    socket.emit('gcodeResponse', SocketResponse(500, err.message));
    return;
  }
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
    if (message === 'open') {
      Port.open((err) => {
        onPortError(socket, err);
        socket.emit('gcodeResponse', SocketResponse(200, 'ok serial connected'));
      });
    }
  });

  Port.pipe(Parser);

  Parser.on('data', (line: any) => {
    socket.emit('gcodeResponse', SocketResponse(200, line));
  });

  socket.on('gcode', (message: string) => {
    Port.open((err) => {
      onPortError(socket, err);
      Port.write(`${message}\n`);
    });
  });

  Port.on('error', (err) => {
    socket.emit('gcodeResponse', SocketResponse(500, err.message));
    console.log(err.message);
  });
};
