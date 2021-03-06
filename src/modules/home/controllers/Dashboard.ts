/**
 * @author Dwi Setiyadi
 */

import * as Hapi from 'hapi';
import {
  HttpResponse,
  // Logger,
} from '../../../utilities';

class Dashboard {

  /**
   * do not use "any" for "req" and "res". Default for "res" is Hapi.ResponseToolkit.
   */
  static welcome = (req: Hapi.Request, res: Hapi.ResponseToolkit) => {

    /**
     * this is the convention that used in this application.
     * HttpResponse used to uniform the return object from all API in this application
     * but you have to use res.response and define the status code
     */

    return HttpResponse(200, 'welcome', res);
  }
};

export default Dashboard;
