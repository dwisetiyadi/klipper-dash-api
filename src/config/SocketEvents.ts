/**
 * @author Dwi Setiyadi
 */

import socketIO from 'socket.io';
import SerialPort from 'serialport';
import Readline from '@serialport/parser-readline';
import * as Data from '../../config/Application.json';

import SocketConsoleModule from '../modules/console/SocketConsole';
import {
  SocketResponse,
} from '../utilities';

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

  console.log(`socketId ${socket.id} connected`);

  // socket on modules
  SocketConsoleModule(socket, port, parser);

  socket.on('end', (client) => {
    socket.disconnect(client);
  });
  socket.on('error', (err) => {
    console.log('Socket.IO Error: ', err.stack);
  });
  socket.once('disconnect', () => {
    console.log(`socketId ${socket.id} disconnected`);
  });
};
