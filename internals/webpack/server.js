/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/, // exclude node_modules
    failOnError: true, // show a warning when there is a circular dependency
  }),
  new webpack.DefinePlugin({
    SERVER_PORT: JSON.stringify(process.env.SERVER_PORT || '3000'),
    SERVER_CORS: JSON.stringify(process.env.SERVER_CORS || '*'),
  }),
];

module.exports = require('./base')({
  entry: ['babel-polyfill', path.join(process.cwd(), 'src/server/index.js')],

  // Don't use hashes in dev mode for better performance
  output: {
    filename: 'server.js',
  },

  // Add development plugins
  plugins, // eslint-disable-line no-use-before-define

  performance: {
    hints: false,
  },
});
