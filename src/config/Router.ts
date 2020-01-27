/**
 * @author Dwi Setiyadi
 */

import RouterHome from '../modules/home/RouterHome';
import RouterAuth from '../modules/auth/RouterAuth';
import RouterConsole from '../modules/console/RouterConsole';

export default [
  ...RouterHome,
  ...RouterAuth,
  ...RouterConsole,
];
