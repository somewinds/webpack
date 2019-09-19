const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    'large-number': './src/index.js',
    'large-number.min': './src/index.js',
  },
  output: {
    filename: '[name].js', // 打包结果：large-number.js 和 large-number.min.js
    library: 'largeNumber', // 打包出来的库的名字
    libraryTarget: 'umd',
    libraryExport: 'default' // 如果不设置为 default，那么使用的时候：largeNumber.default()
  },
  mode: 'none', // 不使用 production，防止打包开发版（large-number.js）的时候也被压缩
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