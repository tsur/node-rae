import HTTPRaeClient from 'clients/http';
import { HTTP_CLIENT } from 'helpers/constants';

/**
 * Rae Client Factory
 * This is an abstraction layer to provide support for different types of
 * Rae Clients whether based on different protocols as HTTP, WS, SSE, ... etc
 * or whatever other variable we may need later on. For now, it just returns
 * a basic HTTP Rae Client.
 * @example
 * import RaeClient from 'rae';
 * const myRaeClient = RaeClient.create();
 * const casa = await myRaeClient.search('casa');
 */
class RaeClient {
  static create(type = HTTP_CLIENT) {
    switch (type) {
      case HTTP_CLIENT:
      default:
        return HTTPRaeClient();
    }
  }

  static help() {
    return `
    > Use it to create a Rae Client which can be used to interact with the RAE.
    > Example: 
      import RaeClient from 'rae';
      const myRaeClient = RaeClient.create();
      const casa = await myRaeClient.search('casa');
    `;
  }
}

export default RaeClient;

module.exports = RaeClient;
