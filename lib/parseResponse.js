const _ = require('lodash');
const htmlparser = require('htmlparser');
const Q = require('q');
const select = require('soupselect').select;

const parseResponse = (callback) => {
  return (error, response) => {
    let handler;
    let parser;
    let results = [];

    if (error) return callback(error, null);
    // now we have the whole body, parse it and select the nodes we want...
    handler = new htmlparser.DefaultHandler((err, dom) => {

      if (err) {
        return callback(error.toString(), null);
      } else {
        // soupselect happening here...
        let lemas = select(dom, 'html body div');

        if (_.isArray(lemas) && !_.isEmpty(lemas)) {

          lemas.map(lema => {
            let result = {};
            result.definitions = [];
            result.id = _.isArray(select(lema, 'a')) ? select(lema, 'a')[0].attribs.name : '';

            select(lema, 'p').map((p, index) => {
              let text = getTextContent(p);

              if (_.isEmpty(text))
                return;

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
          
          callback(null, results);
        } else {
          const lemas = select(dom, 'html body ul li');
          let promises = [];

          lemas.map(lema => {
            let qs = select(lema, 'a')[0].attribs.href.replace('search?', '').split('=');

            promises.push(Rae.search(qs[1], {
              qs: qs[0]
            }));
          })

          Q.all(promises)
            .then(function() {
              _.forEach(arguments[0], function(arg) {
                results = results.concat(arg);
              });
              callback(null, results);
            });
        }
      }
    });
    (new htmlparser.Parser(handler)).parseComplete(response);
  };
};

module.exports = parseResponse;
