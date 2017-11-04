/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'build'),
    },
    options.output
  ), // Merge with env dependent settings
  module: {
    loaders: [
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        loader: 'babel-loader',
        exclude: (modulePath) => modulePath.includes('node_modules'),
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        exclude: [/node_modules/],
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loaders: ['file-loader'],
      },
    ],
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // make fetch available
    }),
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.NamedModulesPlugin(),
  ]),
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js'],
  },
  target: options.target || 'node', // Use 'web; to make web variables accessible to webpack, e.g. window
});
