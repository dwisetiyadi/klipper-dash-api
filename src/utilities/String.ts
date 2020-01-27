/**
 * @author: dwi.setiyadi@gmail.com
*/

export const ucFirst = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);

export const findJsonInString = (string: any): object => {
  let toObj = string.toString().match(/\{(?:[^{}]|(\?R))*\}/g);

  if (toObj === null) return string;

  toObj = JSON.parse(toObj[0]);
  return toObj;
};

export const getExtention = (string: string): string => {

  switch (string) {
    case 'image/jpeg':
      return '.jpeg';

    case 'image/jpg':
      return '.jpg';

    case 'image/png':
      return '.png';

    case 'image/svg+xml':
      return '.svg';

    case 'application/pdf':
      return '.pdf';

    default:
      return '';
  }

};

export const getContentType = (string: string): string => {

  switch (string) {

    case '.jpeg':
      return 'image/jpeg';
    
    case '.jpg':
      return 'image/jpg';

    case '.png':
      return 'image/png';

    case '.svg':
      return 'image/svg+xml';

    case '.pdf':
      return 'application/pdf';

    default:
      return '';
  }

};
