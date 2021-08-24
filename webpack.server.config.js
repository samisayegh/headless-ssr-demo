const path = require('path');
const {babelLoader} = require('./config/loaders');

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/server.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      babelLoader()
    ]
  },
};