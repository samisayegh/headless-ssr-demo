const path = require('path');
const {babelRule} = require('./config/rules');

function cssRule() {
  return {
    test: /\.css$/i,
    use: ['css-loader'],
  }
}

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
      babelRule(),
      cssRule(),
    ]
  },
};