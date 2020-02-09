/**
 * @author Dwi Setiyadi
 */

/* eslint-disable no-console */

import * as Hapi from '@hapi/hapi';
import 'dotenv/config';
import "reflect-metadata";
import socketIO from 'socket.io';
import SerialPort from 'serialport';
import Readline from '@serialport/parser-readline';
import * as Data from './Application.json';
import {
  Plugins,
  Router,
  Cors,
  STRATEGYNAME, STRATEGYSCHEME, STRATEGYOPTIONS,
  SocketEvents,
  SocketMidlewares,
} from '../config';

const App = async (): Promise<void> => {
  const server = new Hapi.Server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: { 
      cors: Cors,
    },
  });

  await server.register(Plugins);

  server.auth.strategy(STRATEGYNAME, STRATEGYSCHEME, STRATEGYOPTIONS);
  server.auth.default(STRATEGYNAME);
  
  const port = new SerialPort(Data.printer.connection.port, {
    baudRate: 250000,
  });
  const parser = new Readline();
  const io = socketIO(server.listener).of((process.env.SOCKET_PATH) ? `/${process.env.SOCKET_PATH}` : '');
  port.on('open', () => {
    io.use((socket: socketIO.Socket, next) => {
      SocketMidlewares(socket, next);
    });
    io.on('connection', (socket: socketIO.Socket) => {
      SocketEvents(socket, port, parser);
    });
  });

  server.route(Router);

  await server.start();
  console.log(`\nKlipper Dash API running at: ${server.info.uri}\n\n`);
};

export default App;
