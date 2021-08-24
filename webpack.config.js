const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {babelRule} = require('./config/rules');

function cssRule() {
  return {
    test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader, 'css-loader'],
  }
}

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/static'),
  },
  module: {
    rules: [
      babelRule(),
      cssRule(),
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({title: 'Output management', template: 'src/index.html'})
  ]
};