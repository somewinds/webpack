const Merge = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const Cssnano = require('cssnano');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const baseConfig = require('./webpack.base.config');

const prodConfig = {
  mode: 'production',
  plugins: [
    // 1. css文件压缩
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessor: Cssnano,
    }),
    // 2. 公共资源包
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js', // https://unpkg.com/react@16/umd/react.development.js
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js', // https://unpkg.com/react-dom@16/umd/react-dom.development.js
          global: 'ReactDOM',
        },
      ],
    }),
  ],
  devtool: 'inline-source-map',
  // 3. 代码分割
  optimization: {
    splitChunks: {
      minSize: 0, // 最小文件大小，小于此大小的不进行分离打包
      cacheGroups: {
        commons: {
          test: /(react|react-dom)/,
          name: 'vendors',
          chunks: 'all',
        },
        myCommons: { // 该模块的作用：被引用的次数大于等于2的文件被打包进名为 my_commons 的 chunk 内
          name: 'my_commons',
          chunks: 'all',
          minChunks: 2, // 最小引用文件的次数
        },
      },
    },
  },
};

module.exports = Merge(baseConfig, prodConfig);
