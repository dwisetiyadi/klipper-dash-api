/**
 * @author: dwi.setiyadi@gmail.com
*/

const parseObj = (code: number, message: any) => {
  let error: any;

  switch (true) {
    case code >= 100 && code < 300:
      error = null;
      break;

    case code >= 400:
      error = 'Bad Request';
      break;

    case code >= 500:
      error = 'Internal Server Error';
      break;
  
    default:
      break;
  }

  const obj = {
    statusCode: code,
    error: error,
    message: message,
  };

  return obj;
};

export const HttpResponse = (code: number, message: any, res: any): any => {
  const obj: any = parseObj(code, message);

  const response = res.response(obj);
  response.code(code);
  return response;
};

export const SocketResponse = (code: number, message: any): any => {
  const obj: any = parseObj(code, message);
  return JSON.stringify(obj);
};
