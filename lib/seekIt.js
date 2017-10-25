const makeRequest = require('./makeRequest.js');
const parseResponse = require('./parseResponse.js');

const seekIt = (callback) => {
  return options => {
    makeRequest(options, parseResponse(callback));
  };
};

module.exports = seekIt;
