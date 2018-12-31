import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';

// i flag is not effective on non-US-ASCII characters, so we need to add the upper cases
const wordRegex = /^(?:[aeiouAEIOU]\u0341|[uU]\u0308|[nN]\u0303|[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ])+$/;

export const isAWord = (word) => isString(word) && !isEmpty(word) && wordRegex.test(word);

export const toFormData = (obj) =>
  Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join('&');
