/**
 * @author Dwi Setiyadi
 */

import { App } from './bootstrap';
import 'reflect-metadata';

App();

process.on('unhandledRejection', (error): void => {
  console.log(error);
  process.exit(1);
});

