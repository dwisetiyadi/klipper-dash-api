/**
 * @author Dwi Setiyadi
 */

import socketIO from 'socket.io';
const exec = require('child_process').exec;

export default (socket: socketIO.Socket, port: any) => {
  socket.on('gcode', (message: string) => {
    switch (message) {
      case 'shutdown':
      case 'SHUTDOWN':
        exec('sudo shutdown -h now');
        break;

      case 'reboot':
      case 'REBOOT':
        exec('sudo shutdown -r now');
        break;

      case 'klipper_restart':
      case 'KLIPPER_RESTART':
        exec('sudo service klipper stop && sudo service klipper start');
        break;
    
      default:
        port.write(`${message}\n`);
        break;
    }
  });
};
