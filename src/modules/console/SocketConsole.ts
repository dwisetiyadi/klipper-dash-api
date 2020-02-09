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
  const port = new SerialPort(Data.printer.connection.port,
    {
      baudRate: Data.printer.connection.baudrate,
      autoOpen: false,
    },
  );
  const parser = new Readline();

  // some helpers
  const onPortConnectionError = (err: any) => {
    if ([...err.message.matchAll(/Error: No such file or directory, cannot open/gm)].length > 0) return true;
    return false;
  };
  const onPortWrite = (gcode?: string) => {
    port.open((err: any) => {
      if (err) {
        const isPortConnectionError = onPortConnectionError(err);
        if (isPortConnectionError) {
          socket.emit('gcodeResponse', SocketResponse(500, err.message));
          return;
        }
      }
  
      if (gcode) {
        port.write(`${gcode}\n`);
        return;
      }
  
      socket.emit('gcodeResponse', SocketResponse(500, 'ok Klipper connected'));
      console.log(gcode);
    });
  };

  // socket and serial run
  socket.on('klipper_dash_connection', (message: string) => {
    if (message === 'open') onPortWrite();
  });
  port.pipe(parser);
  parser.on('data', (line: any) => {
    socket.emit('gcodeResponse', SocketResponse(200, line));
  });
  socket.on('gcode', (message: string) => {
    onPortWrite(message);
  });
  port.on('error', (err: any) => {
    socket.emit('gcodeResponse', SocketResponse(500, err.message));
  });
};
