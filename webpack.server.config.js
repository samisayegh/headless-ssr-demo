const path = require('path');
const {tsRule} = require('./config/rules');

function cssRule() {
  return {
    test: /\.css$/i,
    use: ['css-loader'],
  }
}

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/server.tsx',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      tsRule(),
      cssRule(),
    ]
  },
  resolve: {
    extensions: ['.tsx', '.js', '.css'],
  },
};