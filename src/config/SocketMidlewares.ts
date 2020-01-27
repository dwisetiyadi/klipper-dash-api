/**
 * @author Dwi Setiyadi
 */

import socketIO from 'socket.io';
import AuthSocket from './AuthSocket';

export default (socket: socketIO.Socket, next: any) => {
  AuthSocket(socket, next);
};
