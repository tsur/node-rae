const Urllib = require('urllib');
const util = require('util');
const querystring = require('querystring');
const processResponse = require('./processResponse.js');

const makeRequest = (options, callback) => {
  let qs = {};

  qs[options.qs] = options.word;

  Urllib.request(util.format('%s?%s', options.endpoint, querystring.stringify(qs)), {
    method: 'POST'
  }, processResponse(callback));
};

module.exports = makeRequest;