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
];

export default Routes;
