/**
 * @author: dwi.setiyadi@gmail.com
*/

import axios from 'axios';

let resTimeout = `Looks like the server is taking too long to respond, `;
resTimeout += `this can be caused by either poor connectivity or an error with our server. `;
resTimeout += `Please try again in a while.`;

const getRequestOptions = (method: string, data: any, headers: any, reqOptions: any) => {
  let parseHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (headers) {
    parseHeaders = { ...headers };
  }

  try {
    let requestOptions: any = {
      crossDomain: true,
      method,
      headers: parseHeaders,
      data: data ? data : '',
      timeout: 60000,
      validateStatus: false,
    };

    if (reqOptions) {
      requestOptions = { ...requestOptions, ...reqOptions };
    }

    if (method === 'GET') {
      delete requestOptions.data;
      if (data) {
        requestOptions.params = { ...data };
      }
    }
    
    return requestOptions;
  } catch(e) {
    const errorMessage = `Something went wrong when preparing request options to fetch data: ${e}`;
    return errorMessage;
  }
};

const doFetch = (requestOptions: any, url: string) => {
  try {
    if (typeof requestOptions !== 'string') {
      return axios(url, requestOptions)
        .then((result: any) => {
          return result;
        })
        .catch((err) => {
          const error = JSON.parse(JSON.stringify(err));
          if (error.code === 'ECONNABORTED') {
            return { data: { message: resTimeout } };
          }
          return error;
        });
    } else {
      const errorMessage: string = requestOptions;
      return errorMessage;
    }
  } catch (e) {
    const errorMessage = `Something went wrong when doFetch: ${e}`;
    return errorMessage;
  }
};

export const HttpService = {
  get(url: string, data: any, headers: object, reqOptions: any = null) {
    try {
      const requestOptions: any = getRequestOptions('GET', data, headers, reqOptions);
      return doFetch(requestOptions, url);
    } catch (e) {
      console.log('error at get request method with error: ', e);
      return e;
    }
  },
  post(url: string, data: any, headers: object, reqOptions: any = null) {
    try {
      const requestOptions: any = getRequestOptions('POST', data, headers, reqOptions);
      return doFetch(requestOptions, url);
    } catch (e) {
      console.log('error at post request method with error: ', e);
      return e;
    }
  },
  put(url: string, data: any, headers: object, reqOptions: any = null) {
    try {
      const requestOptions: any = getRequestOptions('PUT', data, headers, reqOptions);
      return doFetch(requestOptions, url);
    } catch (e) {
      console.log('error at put request method with error: ', e);
      return e;
    }
  },
  delete(url: string, data: any, headers: object, reqOptions: any = null) {
    try {
      const requestOptions: any = getRequestOptions('DELETE', data, headers, reqOptions);
      return doFetch(requestOptions, url);
    } catch (e) {
      console.log('error at delete request method with error: ', e);
      return e;
    }
  },
};
