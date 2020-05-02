/**
 * @author Dwi Setiyadi
 */

import * as Hapi from 'hapi';
import * as fs from 'fs-extra';
import {
  HttpResponse,
} from '../../../utilities';

class Files {
  static listing = async (req: Hapi.Request, res: Hapi.ResponseToolkit): Promise<object> => {
    const path = '~/uploads';

    if (!fs.existsSync(path)) {
      fs.mkdirpSync(path);
    }

    const files = fs.readdirSync(path);
    
    return HttpResponse(200, files, res);
  }
};

export default Files;
