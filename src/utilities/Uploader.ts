/**
 * @author: dwi.setiyadi@gmail.com
*/

import fs from 'fs-extra';
import moment from 'moment';
import { getExtention } from './';

const _fileHandler = (file: any, options: any): any => {
  if (!file) throw new Error('no file');

  const orignalname = file.hapi.filename;
  
  let path = `${process.cwd()}/uploads/`;

  fs.mkdirpSync(`${path}AJ/`);
  fs.mkdirpSync(`${path}JE/`);

  fs.mkdirpSync(`${path}AJ/${moment(options.date).format('YYYY')}`);
  fs.mkdirpSync(`${path}JE/${moment(options.date).format('YYYY')}`);

  fs.mkdirpSync(`${path}AJ/${moment(options.date).format('YYYY/MM')}`);
  fs.mkdirpSync(`${path}JE/${moment(options.date).format('YYYY/MM')}`);
  path = `${path}${options.modules}/${moment(options.date).format(`YYYY/MM`)}`;

  const filename =
    `${options.organizationCode}-${options.transactionCode}-${options.date.getTime()}${getExtention(file.hapi.headers['content-type'])}`;
  path = `${path}/${filename}`;
  const fileStream = fs.createWriteStream(path);

  return new Promise((resolve, reject): any => {
    file.on('error', (err: any): any => {
      reject(err);
    });

    file.pipe(fileStream);

    file.on('end', (): any => {
      const fileDetails: any = {
        fieldname: file.hapi.name,
        orignalname,
        filename,
        mimetype: file.hapi.headers['content-type'],
        destination: options.path,
        path,
        size: fs.statSync(path).size,
      };

      resolve(fileDetails);
    });
  });
};

export const uploader = (file: any, options: any): any => {
  if (!file) throw new Error('no file(s)');
  return _fileHandler(file, options);
};