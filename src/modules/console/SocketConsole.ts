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

const onPortConnectionError = (socket: socketIO.Socket, err: any) => {
  if ([...err.message.matchAll(/Error: No such file or directory, cannot open/gm)].length > 0) return true;
  return false;
};

const onPortWrite = (socket: socketIO.Socket, port: any, gcode?: string) => {
  console.log(gcode);

  port.open((err: any) => {
    if (err) {
      const isPortConnectionError = onPortConnectionError(socket, err);
      if (isPortConnectionError) return socket.emit('gcodeResponse', SocketResponse(500, err.message));

      port.on('open', () => {
        console.log('error: ', err.message);
        port.write(`${gcode}\n`);
      });
      
      return;
    }
    
    port.write(`${gcode}\n`);
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
