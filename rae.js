'use strict';

// Dependences
const _ = require('lodash');
const Q = require('q');
const Iconv = require('iconv').Iconv;
const seekIt = require('./lib/seekIt.js');
const util = require('util');


class Rae {

  setOptions(options, word, callback) {
    let _options = _.isObject(options) ? options : {};
    _options.word = (new Iconv('UTF-8', 'ISO-8859-1')).convert(word || '').toString();
    _options.endpoint = _options.endpoint || 'http://lema.rae.es/drae/srv/search';
    _options.qs = (_options.qs || 'val');
    // _options.examples = _options.examples || true;
    // _options.etymology = _options.etymology || true;

    callback(_options);
  };

  search(word, options, callback) {
    let deferred = Q.defer();
    if (!_.isString(word) || _.isEmpty(word) || (/\d/g).test(word) && _.isEmpty((options || {}).qs)) {
      deferred.reject('word must be an alphabetic and not empty string');
      return deferred.promise;
    }
  
    this.setOptions(options, word, seekIt((err, results) => {
      if (err || _.isEmpty(results))
        return deferred.reject((err || '').toString() || 'No results found');
      
      deferred.resolve(results);
    }));
  
    if (_.isFunction(options || callback)) {
      return deferred.promise.nodeify(options || callback);
    }

    return deferred.promise;
  }
}

// Expose to the world
module.exports = Rae;


const a = new Rae();

a.search('casa', function(err, result) {
  console.log('err =>');
  console.log(err)
  console.log('result =>');
  console.log(result);
});
