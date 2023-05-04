import { DateTimeFormatOptions } from '@intlify/core-base';
import { LocalStorage } from 'quasar';

export function sort(property: string, type: string) {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substring(1);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  return function (a: never, b: never) {
    let result;
    if (type === 'asc') {
      result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    } else if (type === 'desc') {
      result =
        a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return result * sortOrder;
  };
}
export function splitString(string: string, maxLength:number) {
  if (string.length > maxLength) {
    return string.slice(0, maxLength) + ' ...';
  } else return string;
}
export function dateConvert(time: string, options?: DateTimeFormatOptions) {
  const date = new Date(time);
  const lang = LocalStorage.getItem('lang') as string;
  const defaultOptions: DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };

  return options
    ? date.toLocaleString(lang, options)
    : date.toLocaleString(lang, defaultOptions);
}
