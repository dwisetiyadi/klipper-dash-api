/**
 * @author Dwi Setiyadi
 */

export default {
  origin: ['*'],
  headers: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'information',
  ],
  exposedHeaders: [
    'Accept',
    'Content-Type',
    'Content-Disposition',
    'content',
    'exp',
  ],
  maxAge: 60,
  credentials: true,
};