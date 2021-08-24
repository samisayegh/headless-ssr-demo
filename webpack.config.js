const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {babelLoader} = require('./config/loaders');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      babelLoader()
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({title: 'Output management', template: 'src/index.html'})
  ]
};