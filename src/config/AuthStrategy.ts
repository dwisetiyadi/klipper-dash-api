/**
 * @author: dwi.setiyadi@gmail.com
*/

import 'dotenv/config';
import * as Data from './Application.json';

const validate = async (decoded: any, request: any): Promise<object> => { // eslint-disable-line @typescript-eslint/no-unused-vars
  try
  {
    const person = Data.users.find((obj: any) => obj.username === decoded.agent.userName && obj.password === decoded.agent.password);
    if (!person) return { isValid: true };
    return { isValid: false };
  }
  catch (error)
  {
    console.log(error);
    return { isValid: false };
  }
};

const verifyOptions = {
  algorithms: [
    'HS256',
  ],
};

const options = {
  key: process.env.SECRET,
  validate,
  verifyOptions,
};

export const STRATEGYNAME = 'jwt';
export const STRATEGYSCHEME = 'jwt';
export const STRATEGYOPTIONS = options;
