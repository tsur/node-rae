var Rae = require('../rae');

var outputResults = function(lema) {

  console.log("Etimologia:", lema.etymology);

  lema.definitions.forEach(console.log);

};

// Callback
Rae.search("repositorio", function(err, lemas) {

  if (err) {

    return console.error(err);

  }

  console.log('Callback Example:');

  lemas.forEach(outputResults);

});

// Promises
var promise = Rae.search("repositorio");

promise
  .then(function(lemas) {

    console.log('Promise Example:');

    lemas.forEach(outputResults);

  })
  .fail(function(err) {

    console.error(err);

  });