/**
 * @author Dwi Setiyadi
 */

import * as Hapi from 'hapi';
import { HttpResponse, sha256, generateToken } from '../../../utilities';
import * as Data from '../../../config/Application.json';

class Auths {
  static signIn = (req: any, res: Hapi.ResponseToolkit) => {
    try {
      const failedMessage = { message: 'Wrong combination username and password.' };

      if (!req.payload) throw failedMessage;

      const person = Data.users.find((obj: any) => obj.username === req.payload.username && obj.password === sha256(req.headers.information));
      
      if (person !== undefined) {
        if (!person.isActive) throw { message: 'User is not activated yet.' };

        const exp: number = Math.floor(new Date().getTime()/1000) + 1*24*60*60;
        const token: string = generateToken(person, exp);
        return HttpResponse(200, {
          username: person.username,
          role: person.role,
        }, res).header('content', token).header('exp', exp);
      }

      throw failedMessage;
    } catch (error) {
      console.log(error);
      if (error.message) return HttpResponse(400, error.message, res);
      return HttpResponse(500, error, res);
    }
  };
}

export default Auths;
