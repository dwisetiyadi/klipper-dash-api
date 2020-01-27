/**
 * @author Dwi Setiyadi
 */

import * as Hapi from 'hapi';
import { Auths } from './controllers';

const Routes: any = [
  {
    method: 'POST',
    path: '/signin',
    config: {
      auth: false,
    },
    handler: (req: any, res: Hapi.ResponseToolkit): object => Auths.signIn(req, res),
  },
];

export default Routes;
