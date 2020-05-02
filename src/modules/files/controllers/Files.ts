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
        return {
          filename: file,
          ext: path.extname(`${pathUpload}/${file}`),
          size: stat.size,
          created: stat.birthtime,
        };
      });
      // .filter((file) => file.ext === 'gcode');
    console.log(pathUpload, files, fs.existsSync(pathUpload));
    return HttpResponse(200, files, res);
  }
};

export default Files;
