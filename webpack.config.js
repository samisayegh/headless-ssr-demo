const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {tsRule} = require('./config/rules');

function cssRule() {
  return {
    test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader, 'css-loader'],
  }
}

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/static'),
  },
  devServer: {
    static: './dist/static',
    historyApiFallback: true,
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
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({title: 'Output management', template: 'src/index.html'})
  ]
};