/**
 * @author Dwi Setiyadi
 */

import * as Hapi from 'hapi';
import { Files } from './controllers';

const Routes = [
  {
    method: 'GET',
    path: '/files',
    handler: (req: Hapi.Request, res: Hapi.ResponseToolkit): object => Files.listing(req, res),
  },
  // {
  //   method: 'POST',
  //   path: '/file',
  //   handler: (req: Hapi.Request, res: Hapi.ResponseToolkit): object => Files.read(req, res),
  // },
  {
    method: 'GET',
    path: '/file/{gcode}',
    handler: {
      file: {
        path: (req: Hapi.Request, res: Hapi.ResponseToolkit): string => Files.read(req, res),
        confine: false,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/file/{gcode}',
    handler: (req: Hapi.Request, res: Hapi.ResponseToolkit): object => Files.delete(req, res),
  },
];

export default Routes;
