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
  // serial port connection
  const port = new SerialPort(Data.printer.connection.port, (err: any) => {
    if (err) {
      if ([...err.message.matchAll(/Error: No such file or directory, cannot open/gm)].length > 0) {
        socket.emit('gcodeResponse', SocketResponse(500, err.message));
      }
    }
  });
  const parser = new Readline();

  // some helpers
  // const onPortConnectionError = (err: any) => {
  //   if ([...err.message.matchAll(/Error: No such file or directory, cannot open/gm)].length > 0) return true;
  //   return false;
  // };

  // socket and serial run
  port.pipe(parser);
  parser.on('data', (line: any) => {
    socket.emit('gcodeResponse', SocketResponse(200, line));
  });
  socket.on('gcode', (message: string) => {
    port.write(`${message}\n`);
  });
};
