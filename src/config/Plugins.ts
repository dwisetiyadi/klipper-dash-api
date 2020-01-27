/**
 * @author Dwi Setiyadi
 */

import * as inert from '@hapi/inert';
import * as hapiAuthJwt2 from 'hapi-auth-jwt2';

export default [
  {
    plugin: inert,
  },
  {
    plugin: hapiAuthJwt2,
  },
];
