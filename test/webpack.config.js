'use strict';

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // entry: './src/index.js',
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // filename: 'bundle.js'
    filename: 'bundle_[name].js'
  },
  mode: 'production',
  module: {
    rules: [
      /* { test: /\.js$/, use: 'babel-loader' }, */
      { 
        test: /\.css$/, 
        use: [
          'style-loader',
          'css-loader'
        ]
       },
       {
         test: /\.less$/,
         use: [
           'style-loader',
           'css-loader',
           'less-loader'
         ]
       },
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
    /* new HtmlWebpackPlugin({
      template: './src/index.html'
    }) */
  ]
}