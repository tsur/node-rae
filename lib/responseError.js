const responseError = (error, data, response) => {
  if (error || response.statusCode != 200) {
    if (typeof error === 'string') return error || true;
    return error.toString() || true;
  }
};

module.exports = responseError;
