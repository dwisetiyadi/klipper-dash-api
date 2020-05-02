/**
 * @author Dwi Setiyadi
 */

import os from 'os';
import path from 'path';
import * as Hapi from 'hapi';
import * as fs from 'fs-extra';
import {
  HttpResponse,
} from '../../../utilities';

class Files {
  static listing = async (req: Hapi.Request, res: Hapi.ResponseToolkit): Promise<object> => {
    const pathUpload = `${path.resolve(os.homedir())}/uploads`;

    if (!fs.existsSync(pathUpload)) {
      fs.mkdirpSync(pathUpload);
    }

    const files = fs.readdirSync(pathUpload)
      .map((file) => {
        const stat = fs.statSync(`${pathUpload}/${file}`);
        const ext = path.extname(`${pathUpload}/${file}`);
        return {
          fullname: file,
          filename: file.replace(ext, ''),
          ext: ext.replace('.', ''),
          size: stat.size,
          created: stat.birthtime,
        };
      })
      .filter((file) => file.ext === 'gcodea');
      
    return HttpResponse(200, files, res);
  }
};

export default Files;
