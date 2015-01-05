'use strict';

(function() {

  // Dependences
  var _ = require('lodash');
  var Q = require('q');
  var Urllib = require('urllib');
  var htmlparser = require("htmlparser");
  var select = require('soupselect').select;

  //Variables & Constants
  var Rae = {};

  // Functions
  var setOptions = function(options, word, fn) {

    var _options = _.isObject(options) ? options : {};

    _options.word = word || '';
    _options.endpoint = _options.endpoint || 'http://lema.rae.es/drae/srv/';
    _options.qs = _options.qs || 'search?val=';
    _options.examples = _options.examples || true;
    _options.etymology = _options.etymology || true;

    fn(_options);

  };

  var makeRequest = function(options, fn) {

    Urllib.request(options.endpoint + options.qs + options.word, {
      method: 'POST'
    }, processResponse(fn));

  };

  var processResponse = function(fn) {

    return function(error, data, response) {

      return fn(responseError.apply(null, arguments), data.toString('utf8'));

    };

  };

  var responseError = function(error, data, response) {

    if (error || response.statusCode != 200) {

      if (typeof error === 'string') return error || true;

      return error.toString() || true;

    }

  };

  var parseResponse = function(fn) {

    return function(error, response) {

      if (error) return fn(error, null);

      var handler, parser, results = [];

      // now we have the whole body, parse it and select the nodes we want...
      handler = new htmlparser.DefaultHandler(function(err, dom) {

        if (err) {

          return fn(error.toString(), null);

        } else {

          // soupselect happening here...
          var lemas = select(dom, 'html body div');

          if (_.isArray(lemas) && !_.isEmpty(lemas)) {

            _.forEach(lemas, function(lema) {

              var result = {};

              result.definitions = [];

              result.id = _.isArray(select(lema, 'a')) ? select(lema, 'a')[0].attribs.name : '';

              _.forEach(select(lema, 'p'), function(p, i) {

                var text = getTextContent(p);

                if (_.isEmpty(text)) {

                  return;
                }

                if (i === 0) {

                  result.lema = text;

                } else if (i === 1) {

                  result.etymology = text;

                } else if (p.attribs.class === 'q') {

                  result.definitions.push(text.replace(/\&\#32\;/g, ''));

                }

              });

              results.push(result);

            });

            fn(null, results);

          } else {

            var lemas = select(dom, 'html body ul li');

            var promises = [];

            _.forEach(lemas, function(lema) {

              var qs = select(lema, 'a')[0].attribs.href;

              promises.push(Rae.search(null, {
                qs: qs
              }));

            });

            Q.all(promises)
              .then(function() {

                _.forEach(arguments[0], function(arg) {

                  results = results.concat(arg);

                });

                fn(null, results);

              });

          }

        }

      });

      (new htmlparser.Parser(handler)).parseComplete(response);

    };

  };

  var getTextContent = function(dom) {

    var text = '';

    if (dom.type === 'text') {

      return dom.raw;
    }

    _.forEach(dom.children, function(element) {

      if (element.type === 'text') {

        text += element.raw;

      } else {

        text += getTextContent(element);
      }

    });

    return text;

  };

  var seekIt = function(fn) {

    return function(options) {

      makeRequest(options, parseResponse(fn));

    };

  };

  Rae.search = function(word, options, callback) {

    var deferred = Q.defer();

    setOptions(options, word, seekIt(function(err, results) {

      if (err) {

        return deferred.reject(err.toString() || 'No results found');

      }

      deferred.resolve(results);

    }));

    if (_.isFunction(callback)) {

      return deferred.promise.nodeify(callback);

    }

    return deferred.promise;

  };

  // Expose to the world
  module.exports = exports = Rae;

})();