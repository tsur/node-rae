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
      'Description:\tRae Dictionary',
      '\n\n Uso:',
      '\n\trae <word>',
      '\n\trae -w <word>',
      '\n\trae --word <word> --endpoint <url>',
      '\n\n Opciones:',
      '\n\t-w, --word\n\t\tEl término a buscar en el diccionario',
      '\n\t-e, --endpoint\n\t\tRae URL de búsqueda',
      '\n\t-d, --debug\n\t\tModo debug. Útil para detectar errores',
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
  var Readline = require('readline');
  var Rae = require('./../rae');
  var options = {};

  var readLine = function(prompt, cb) {

    var rl = Readline.createInterface(process.stdin, process.stdout);

    rl.setPrompt(prompt + '>> ');

    rl.prompt();

    rl.on('line', function(line) {

      cb(line.trim());
      rl.close();

    });

  };

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

    if (_.isArray(lemas) && lemas.length > 1) {

      options.detach = true;

      console.log('\n Hemos encontrados varios resultados para esta entrada\n');

      var handlers = {};

      _.forEach(lemas, function(lema, i) {

        console.log('\t' + (i + 1) + '. ' + lema.lema.replace('.', '').trim());

        handlers[i + 1] = function() {

          console.log();

          console.log('Termino:', lema.lema.replace('.', '').trim());

          if (!_.isEmpty(lema.etymology)) {

            console.log("Etimologia:", lema.etymology);

          }

          _.forEach(lema.definitions, function(definition) {

            console.log(definition);

          });

          console.log();

        };

      });

      console.log('\n Introduzca el número del termino que desee consultar y pulse Enter');
      console.log(' Escriba cualquier otro carácter para salir\n');

      var processLine = function(result) {

        if (_.isFunction(handlers[result])) {

          handlers[result]();

        } else {

          process.exit(0);

        }

      }

      return readLine('', processLine);
    }

    if (_.isArray(lemas)) {

      console.log();

      _.forEach(lemas, function(lema) {

        if (options.debug) {

          if (!_.isEmpty(lema.id)) {

            console.log("Id:", lema.id);

          };

          if (!_.isEmpty(lema.lema)) {

            console.log("Lema:", lema.lema);

          };

        }

        if (!_.isEmpty(lema.etymology)) {

          console.log("Etimologia:", lema.etymology);

        }

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
    var word = argv['w'] || argv['word'] || argv._[0];

    if (_.isEmpty(word)) {

      return printError('Must provide a word to look up for!');

    }

    // Debug Output
    options.debug = argv['d'] || argv['debug'];

    if (options.debug) {

      console.time('lookupTime');

    }

    Rae.search(word, options).then(printResponse).fail(printError).done(function() {

      if (options.debug) {

        console.time('lookupTime');

      }

      if (!options.detach) {

        process.exit(0);

      }

    });

  })(options);

})();