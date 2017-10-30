import { isString, isEmpty } from 'lodash';

const wordRegex = /^[a-z]+$/i;

export const isAWord = (word) => isString(word) && !isEmpty(word) && wordRegex.test(word);

export const toFormData = (obj) =>
  Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join('&');
