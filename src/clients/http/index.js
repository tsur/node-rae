import { isAWord } from 'helpers/utils';
import request from 'clients/http/request';
import { NotValidWordError } from 'clients/http/errors';
import { RAE_FETCH_ACTION, RAE_OFFICIAL_HTTP_ENDPOINT } from 'helpers/constants';

/**
 * RAE HTTP Client
 * This is an RAE client that uses the public http://www.rae.es API
 */
export class HTTPRaeClient {
  static search(word) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!isAWord(word)) {
          return reject(NotValidWordError(word));
        }
        return resolve(await request(word));
      } catch (error) {
        return reject(error);
      }
    });
  }

  static fetch(id) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await request(id, {
          action: RAE_FETCH_ACTION,
          endpoint: RAE_OFFICIAL_HTTP_ENDPOINT,
        }));
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default () => HTTPRaeClient;
