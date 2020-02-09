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
import * as Data from '../config/Application.json';
import {
  Plugins,
  Router,
  Cors,
  STRATEGYNAME, STRATEGYSCHEME, STRATEGYOPTIONS,
  SocketEvents,
  SocketMidlewares,
} from '../config';
// import { getConnectionMinio } from '../utilities';

const Port = new SerialPort(Data.printer.connection.port,
  {
    baudRate: Data.printer.connection.baudrate,
    autoOpen: false,
  },
);

const Parser = new Readline();

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
  
  const namespace = (process.env.SOCKET_PATH) ? `/${process.env.SOCKET_PATH}` : '';
  const io = socketIO(server.listener, {
    // pingInterval: 60000,
    // pingTimeout: 120000,
    transports: ['websocket'],
  }).of(namespace);
  io.use((socket: socketIO.Socket, next) => { SocketMidlewares(socket, next); });
  io.once('connection', (socket: socketIO.Socket) => { SocketEvents(socket, Port, Parser); });

  server.route(Router);

  await server.start();
  console.log(`\nKlipper Dash API running at: ${server.info.uri}\n\n`);
};

export default App;
