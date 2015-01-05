#!/usr/bin/env node

'use strict';

(function() {

  var _ = require('lodash');
  var argv = require('minimist')(process.argv.slice(2));

  var printHelp = function(logger, exit) {

    logger = logger || console;
    exit = exit || true;

    logger.log(

      '\n',
      'Description:\tDiccionario Rae',
      '\n\n Uso:',
      '\n\trae <termino>',
      '\n\trae --palabra <palabra>',
      '\n\trae --termino <termino>',
      '\n\trae --palabra <palabra> --endpoint <url>',
      '\n\n Opciones:',
      '\n\t-t, --termino\n\t\tEl término a buscar en el diccionario',
      '\n\t-p, --palabra\n\t\tEl término a buscar en el diccionario',
      '\n\t-e, --endpoint\n\t\tRae URL de búsqueda',
      '\n\n'
    );

    if (exit) {

      process.exit(0);

    }

  };

  // Asking for help ?
  if ((_.isEmpty(argv._) && _.keys(argv).length === 1) || (typeof argv._[0] === 'string' && argv._[0].toLowerCase() === 'help')) {

    return printHelp();
  }

  // Dependences
  var Rae = require('./../rae');
  var options = {};

  var printError = function(logger) {

    var errors;

    if (typeof logger === 'string') {

      logger = console;
      errors = arguments;

    } else {

      logger = logger;
      errors = arguments.splice(1);
    }

    logger.trace.apply(this, errors);

    process.exit(0);

  };

  var printResponse = function(lemas) {

    if (_.isArray(lemas)) {

      console.log();

      _.forEach(lemas, function(lema) {

        if (options.verbose) {

          console.log("Id:", lema.id);
          console.log("Lema:", lema.lema);

        }

        console.log("Etimologia:", lema.ethimology);

        _.forEach(lema.definitions, function(definition) {

          console.log(definition);

        });

        console.log();

      });

    } else {

      console.log('No results were found!');

    }

  };

  // Run it!
  (function(options) {

    // Word/Term
    var word = argv['t'] || argv['termino'] || argv['p'] || argv['palabra'] || argv._[0];

    if (_.isEmpty(word)) {

      return printError('Must provide a word to look up for!');

    }

    // Verbose Output
    options.verbose = argv['v'] || argv['verbose'];

    if (options.verbose) {

      console.time('lookupTime');

    }

    Rae.search(word, options).then(printResponse).fail(printError).done(function() {

      if (options.verbose) {

        console.time('lookupTime');

      }

      process.exit(0);

    });

  })(options);

})();