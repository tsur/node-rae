const RaeClient = require('../build/lib.js');

RaeClient.create()
  .search('casa')
  .then((result) => {
    console.log(result);
  });
