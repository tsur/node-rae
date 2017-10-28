/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require("path");
const webpack = require("webpack");
const CircularDependencyPlugin = require("circular-dependency-plugin");

const plugins = [
  new webpack.NoErrorsPlugin(),
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/, // exclude node_modules
    failOnError: false // show a warning when there is a circular dependency
  })
];

module.exports = require("./base")({
  entry: [path.join(process.cwd(), "src/cli/index.js")],

  // Don't use hashes in dev mode for better performance
  output: {
    filename: "cli.js"
  },

  // Add development plugins
  plugins: plugins, // eslint-disable-line no-use-before-define

  performance: {
    hints: false
  }
});
