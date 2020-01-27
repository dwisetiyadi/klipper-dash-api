/**
 * @author: dwi.setiyadi@gmail.com
*/

import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import * as Crypto from 'crypto-js';

export const sha256 = (message: string): string => {
  return Crypto.SHA256(message).toString();
};

export const uid = (): string => {
  return sha256((new Date()).valueOf().toString()).toString();
};

export const generateToken = (agent: object, exp: any = null): string => {
  // console.log(exp);
  if (!exp) exp = Math.floor(new Date().getTime()/1000) + 1*24*60*60;
  // console.log(exp);
  const secret: any = process.env.SECRET;
  return jwt.sign({
    id: uid,
    agent,
    exp,
  }, secret);
};

export const decodeToken = (token: string): string | object | boolean => {
  const secret: any = process.env.SECRET;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return false;
  }
};