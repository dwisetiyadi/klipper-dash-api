/**
 * @author: dwi.setiyadi@gmail.com
*/

import { HttpResponse, SocketResponse } from './ResponseHandling';
import { findJsonInString, getExtention, getContentType } from './String';
import { sha256, uid, generateToken, decodeToken } from './HashEncrypt';
import { uploader } from './Uploader';
import { HttpService } from './HttpService';

export {
  HttpResponse,
  SocketResponse,
  findJsonInString, getExtention, getContentType,
  sha256, uid, generateToken, decodeToken,
  uploader,
  HttpService,
};
