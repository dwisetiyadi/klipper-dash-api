/**
 * @author Dwi Setiyadi
 */

import socketIO from 'socket.io';
import * as Data from './Application.json';
import { decodeToken } from '../utilities';

export default (socket: socketIO.Socket, next: any) => {
  // try {
  //   if (!socket.handshake.query.token) throw 'missing parameter token.';
  //   const decoded: any = decodeToken(socket.handshake.query.token);
  //   if (!decoded) throw 'invalid token.';
  //   const person = Data.users.find((obj: any) => obj.username === decoded.agent.userName && obj.password === decoded.agent.password);
  //   if (!person) return next();
  //   throw 'authentication error';
  // } catch(error) {
  //   console.log(error);
  //   return next(new Error(error));
  // }
  return next(new Error('test error'));
};
