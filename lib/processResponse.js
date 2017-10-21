const responseError = require('./responseError');

const processResponse = (callback) => {
  return (error, data, response) => {
    return callback(responseError.apply(null, arguments), data.toString('utf8'));
  };
};

module.exports = processResponse;