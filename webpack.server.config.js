const path = require('path');

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/server.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
};