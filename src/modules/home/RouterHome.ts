/**
 * @author Dwi Setiyadi
 */

import * as Hapi from 'hapi';
import { Dashboard } from './controllers';

const Routes = [
  {
    method: 'GET',
    path: '/',
    handler: (req: Hapi.Request, res: Hapi.ResponseToolkit): object => Dashboard.welcome(req, res),
  },
];

export default Routes;
