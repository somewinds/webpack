const Merge = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require('./webpack.base.config');

const devConfig = {
  mode: 'development',
  plugins: [
    // 1. 热更新
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only',
  },
  devtool: 'cheap-source-map',
};

module.exports = Merge(baseConfig, devConfig);
