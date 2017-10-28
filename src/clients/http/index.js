import { isAWord } from "helpers/utils";
import request from "clients/http/request";
import { NotValidWordError } from "clients/http/errors";

/**
 * RAE HTTP Client
 * This is an RAE client that uses the public http://www.rae.es API
 */
export class HTTPRaeClient {
  constructor(options) {
    this.options = options;
  }

  search(word) {
    return new Promise(async (resolve, reject) => {
      if (!isAWord(word)) {
        return reject(NotValidWordError(word));
      }
      try {
        resolve(await request(word, this.options));
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default options => new HTTPRaeClient(options);
