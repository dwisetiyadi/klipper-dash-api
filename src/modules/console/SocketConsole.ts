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

  Port.pipe(Parser);
  Parser.on('data', (line: any) => socket.emit('gcodeResponse', SocketResponse(200, line)));

  Port.open((err) => {
    if (err) return socket.emit('gcodeResponse', SocketResponse(500, err.message));
  });

  Port.setMaxListeners(0);

  // gcode command handle
  socket.on('gcode', (message: string) => {
    Port.on('open', (err) => {
      if (err) return socket.emit('gcodeResponse', SocketResponse(500, err.message));
      Port.write(`${message}\n`, (err) => err ? socket.emit('gcodeResponse', SocketResponse(500, err.message)) : '');
    });
  });

  setInterval(() => {
    Port.on('open', (err) => {
      if (err) return socket.emit('gcodeResponse', SocketResponse(501, err.message));
      Port.write(`M105\n`, (err) => err ? socket.emit('gcodeResponse', SocketResponse(501, err.message)) : '');
    });
  }, 1000);

  Port.on('error', (err) => {
    if (err) return socket.emit('gcodeResponse', SocketResponse(500, err.message));
  });
};
