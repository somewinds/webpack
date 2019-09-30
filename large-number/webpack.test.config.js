const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    'larget-number': './src/index.js',
    'larget-number.min': './src/index.js'
  },
  output: {
    filename: '[name].js',
    library: 'largeNumber',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  mode: 'none',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        test: /\.min\.js$/
      })
    ]
  }
}