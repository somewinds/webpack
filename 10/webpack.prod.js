const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const Cssnano = require('cssnano');
// const CleanWebpackPlugin = require('clean-webpack-plugin'); // v2+用法
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // v3+用法

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle_[chunkhash:8].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  // browsers: ['last 2 version', '>1%', 'ios 7']
                })
              ]
            }
          }
        ]
      },
      /* {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      }, */
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eof|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    // html模板压缩
    new HtmlWebpackPlugin({
      // template: './src/index.html'
      template: path.join(__dirname, 'src/index.html'), // 模板位置
      filename: 'index.html', // 打包出的html文件名称
      chunks: '[index]', // html使用那些chunk
      inject: true, // | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
      minify: {
        html5: true, // true 根据HTML5规范解析输入
        collapseWhitespace: true, // 折叠构成文档树中文本节点的空白，默认 false：true 移除空格，false 保留空格
        preserveLineBreaks: false, // 保留换行符，默认false，必须与collapseWhitespace=true一起使用：true 保留换行符，false 保留换行符
        minifyCSS: true, // 在样式元素和样式属性中缩小CSS（使用干净的CSS），默认 false：true 压缩模板内的css
        minifyJS: true, // 在脚本元素和事件属性中缩小javascript（使用uglifyjs），默认 false：true 压缩模板内的js，并移除注释
        removeComments: true // 删除HTML注释，默认 false：true 删除html内的注释，只限html部分
      }
    }),
    // 提取出css文件
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    // css文件压缩
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessor: Cssnano
    }),
    // 构建前自动清理dist
    new CleanWebpackPlugin()
  ],
};