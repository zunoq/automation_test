import { boot } from 'quasar/wrappers';
import { LocalStorage } from 'quasar';
// 'async' is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do

  function dateConvert(time, options) {
    let date = new Date(time);
    let defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };

    return options
      ? date.toLocaleString(LocalStorage.getItem('lang'), options)
      : date.toLocaleString(LocalStorage.getItem('lang'), defaultOptions);
  }
  function splitString(string, maxLength) {
    if (string.length > maxLength) {
      return string.slice(0, maxLength) + ' ...';
    } else return string;
  }
  function sort(property, type) {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      let result;
      if (type === 'asc') {
        result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      } else if (type === 'desc') {
        result =
          a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0;
      }

      return result * sortOrder;
    };
  }

  app.config.globalProperties.$dateConvert = dateConvert;
  app.config.globalProperties.$splitString = splitString;
  app.config.globalProperties.$sort = sort;
});
