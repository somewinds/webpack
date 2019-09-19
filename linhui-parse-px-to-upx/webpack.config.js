const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  target: 'node',
  entry: {
    'linhui-parse-px-to-upx': './src/index.js',
    'linhui-parse-px-to-upx.min': './src/index.js',
  },
  output: {
    filename: '[name].js', // 打包结果：xxx.js 和 xxx.min.js
    library: 'linhuiParsePxToUpx', // 打包出来的库的名字
    libraryTarget: 'umd',
    libraryExport: 'default' // 如果不设置为 default，那么使用的时候：linhuiParsePxToUpx.default()
  },
  mode: 'none', // 不使用 production，防止打包开发版（xxx.js）的时候也被压缩
  // 通过 include 设置只压缩 min.js 结尾的文件
  optimization: {
    minimize: true,
    minimizer: [
      // Terser 区别于 uglifyjs，它在压缩的过程能识别ES6
      new TerserPlugin({
        include: /\.min\.js$/,
      })
    ]
  }
}