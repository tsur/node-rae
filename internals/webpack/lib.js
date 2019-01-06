/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new CircularDependencyPlugin({
    exclude: /node_modules/, // exclude node_modules
    failOnError: true, // show a warning when there is a circular dependency
  }),
];

module.exports = require('./base')({
  // entry: ['babel-polyfill', path.join(process.cwd(), 'src/lib/index.js')],
  entry: [path.join(process.cwd(), 'src/lib/index.js')],


  externals : {
    cheerio: 'cheerio',
    lodash: 'lodash',
    'isomorphic-fetch': 'isomorphic-fetch',
    
  },

  // Don't use hashes in dev mode for better performance
  output: {
    filename: 'lib.js',
    library: 'Rae',
    libraryTarget: 'umd',
  },

  // Add development plugins
  plugins, // eslint-disable-line no-use-before-define
});
