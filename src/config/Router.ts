/**
 * @author Dwi Setiyadi
 */

import RouterHome from '../modules/home/RouterHome';
import RouterAuth from '../modules/auth/RouterAuth';
import RouterFiles from '../modules/files/RouterFiles';

export default [
  ...RouterHome,
  ...RouterAuth,
  ...RouterFiles,
];
