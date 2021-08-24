function tsRule() {
  return {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }
}

module.exports = {tsRule}