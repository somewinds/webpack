### 15. 解析ES6和React JSX

#### 解析ES6
```
npm i babel-loader @babel/core @babel/preset-env -D
```

.babelrc
```
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

webpack.config.js
```
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
```

helloworld.js
```
export function helloWorld(){

  const arr = [1, 2, 3];
  const newArr = arr.map(item => item * 2);
  console.log(arr, newArr);
  return 'Hello webpack';
}
```

#### 解析React JSX

```
npm i react react-dom @babel/preset-react -D

```

.babelrc
```
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

react-dom-search.js
```
import React from 'react';
import ReactDOM from 'react-dom';

class Search extends React.Component {
  render() {
    return <div>Search</div>
  }
}

// 将 Search 渲染到 app 节点上
ReactDOM.render(
  <Search></Search>,
  document.getElementById('app')
);
```

index.html
```
  <div id="app"></div>
```

修改 webpack.config.js 或者 src/index.js  
webpack.config.js（以 react-dom-search.js 为入口文件）：
```  
entry: './src/react-dom-search.js',
```

src/index.js（以 index.js 未入口文件，引入 react-dom-search.js）：
```  
import "./react-dom-search.js";
```

---

### 16. 解析CSS、Less和Sass

#### 解析CSS
```
npm i style-loader css-loader -D
```

webpack.config.js
```
    {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
```

src\search.css
```
.search{
  color: red;
}
```

src\react-dom-search.js
```
import './search.css';

    return <div class="search">Search</div>

```

#### 解析Less
```
npm i less less-loader -D
```

webpack.config.js
```
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
```

src\search.less
```
.search{
  width: 200px;
  height: 140px;
  border: 1px solid red;
  border-radius: 5px;
  padding: 20px;

  .text{
    padding: 10px;
    color: blue;
  }
}
```

src\react-dom-search.js
```
import './search.less';


    return <div class="search">
      Search
      <div class="text">search-text</div>
    </div>
```

---

### 17. 解析图片和文字

#### 解析图片
```
npm i file-loader url-loader -D
```

webpack.config.js
```
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      }
```

src\react-dom-search.js
```
import bakugou from './images/bakugou.jpg';

      <img src={ bakugou }></img>
```

#### 解析文字
webpack.config.js
```
      {
        test: /\.(woff|woff2|eof|ttf|otf)$/,
        use: 'file-loader'
      }
```

#### 解析图片2

使用 url-loader，可以将较小的资源自动转Base64，内部也是用了 file-loader

webpack.config.js
```
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 12000
            }
          }
        ]
      }
```

### 18. webpack中的文件监听

#### 方法一：

package.json
```
"watch": "webpack --watch"
```

#### 方法二：

webpack.config.js
```

module.exports = {
  watch: true, // 默认为false，不开启
  // 只有 watch 开启时 watchOptions 才有意义
  watchOptions: {
    // 默认为空，不监听的文件或文件夹，支持正则匹配
    ignore: /node_modules/,
    // 监听到变化发生后会等300ms再去执行，默认 300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认 1000ms 询问一次
    poll: 1000
  }
};
```

### 19. webpack中的热更新及原理分析

```
npm i webpack-dev-server -D
```

package.json
```
    "dev": "webpack-dev-server --open --inline --progress"
```
[开发中 Server(devServer)](https://www.webpackjs.com/configuration/dev-server/#devserver-inline)
- -- open 编译完成后打开浏览器
- -- inline 这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台。（看不出有什么区别）
- -- progress 将运行进度输出到控制台

webpack.config.js
```
const webpack = require('webpack');


  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
```

### 20. 文件指纹策略：chunkhash、contenthash和hash

package.json
```
"build": "webpack --config webpack.prod.js",
"dev": "webpack-dev-server --open --inline --progress --config webpack.dev.js"
```

#### bundle.js生成 hash 指纹，图片生成 hash 指纹
webpack.prod.js
```
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    filename: 'bundle_[chunkhash:8].js'
  },
  mode: 'production',
  module: {
    [
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
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
};

```

#### css文件提取出来并生成指纹
```
npm i mini-css-extract-plugin -D

```

webpack.prod.js
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    })
  ],
};
```

### 21. HTML、CSS和JS代码压缩

```
npm i optimize-css-assets-plugin cssnano -D
```

webpack.prod.js
```
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const Cssnano = require('cssnano');

  plugins: [
    // 提取出css文件
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    // css文件压缩
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessor: Cssnano
    })
  ],
```

#### html模板压缩
```
npm i html-webpack-plugin -D
```

[html-webpack-plugin 配置](https://github.com/jantimon/html-webpack-plugin)  
[html-webpack-plugin 内 minify 配置](https://github.com/kangax/html-minifier)

webpack.prod.js
```
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  ],
```

### 22. 自动清理构建目录产物

```
npm i clean-webpack-plugin -D
```


[clean-webpack-plugin 使用说明](https://www.npmjs.com/package/clean-webpack-plugin)

webpack.prod.js、webpack.dev.js
```
// const CleanWebpackPlugin = require('clean-webpack-plugin'); // v2+用法
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // v3+用法

  plugins: [
    // 构建前自动清理dist
    new CleanWebpackPlugin()
  ],
```


### 23. PostCSS插件autoprefixer自动补齐CSS3前缀

```
npm i -D postcss autoprefixer
```

10\src\search.css
```
.search {
  color: red;
  transition: all 0.4s ease;
}

.search:hover {
  transform: rotate(90deg);
}
```

10\webpack.prod.js
```
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
```


### 24. 移动端CSS px自动转换成rem
px2rem、手淘 lib-flexible 库

```
npm i -D px2rem-loader
```

10\webpack.prod.js

module.rules 里less-loader应该写在px2rem-loader后面，不然会报错
```
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, // 编译less后，提取到css打包文件
          // 'style-loader',
          'css-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // rem单位，1rem = 75px
              remPrecesion: 8 // 转换为rem后的小数位数
            }
          },
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: ['last 2 version', '>1%', 'ios 7']
                })
              ]
            }
          },
        ]
      },
```


### 25. 静态资源内联

代码层面：
- 页面框架的初始化脚本
- 上报相关打点
- css 内联避免页面闪动

请求层面：
- 减少 HTTP 网络请求数
- 小图片或者字体内联 url-loader：小于 limit 自动内联

##### HTML 和 JS 内联
1. raw-loader 内联 html
2. raw-loader 内联 JS
3. 使用v0.5版本

##### CSS 内联
1. 借助 style-loader
```
options: {
  singleton: true // 将所有的style标签合并成一个
}
```
2. html-inline-css-webpack-plugin


```
npm i -D lib-flexible raw-loader
```

10\src\meta.html
```
<meta name="description" content="后台管理系统，包括日常工作流程，财务管理，数据分析，个人工作台等">
```

10\src\index.html
```
<head>
  ${ require('raw-loader!./meta.html') }
  <script>${require('raw-loader!babel-loader!../node_modules/lib-flexible/flexible.js')}</script>
</head>
```

### 26. 多页面应用打包通用方案

entry 用法：

10\webpack.prod.js
```

  entry: {
    index: './src/index/index.js',
    search: './src/search/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle_[name]_[chunkhash:8].js'
  },
  plugins: [
    // html模板及压缩
    new HtmlWebpackPlugin({
      // template: './src/index.html'
      template: path.join(__dirname, 'src/index.html'), // 模板位置
      filename: 'index.html', // 打包出的html文件名称
      chunks: '[index]', // html使用那些chunk，包含所有入口文件
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
    // html模板及压缩
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'), // 模板位置
      filename: 'search.html', // 打包出的html文件名称
      chunks: ['search'], // html使用那些chunk，只包含search入口文件
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
  ],
```


glob.sync 用法：
```
npm i -D glob
```

10\webpack.prod.js
```

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  // 使用 glob.sync 以通配符的形式匹配到入口文件
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
  // console.log(entryFiles);
  Object.keys(entryFiles)
    .map(index => {
      let entryFile = entryFiles[index];
      const match = entryFile.match(/src\/(.*)\/index\.js/);
      // console.log(match)
      const pageName = match && match[1];

      // entry[pageName] = `./${match[0]}`;
      entry[pageName] = entryFile;

      htmlWebpackPlugins.push(
        // html模板及压缩
        new HtmlWebpackPlugin({
          // template: './src/index.html'
          template: path.join(__dirname, 'src/index.html'), // 模板位置
          filename: `${pageName}.html`, // 打包出的html文件名称
          chunks: [pageName], // html使用那些chunk，包含所有入口文件
          inject: true, // | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
          minify: {
            html5: true, // true 根据HTML5规范解析输入
            collapseWhitespace: true, // 折叠构成文档树中文本节点的空白，默认 false：true 移除空格，false 保留空格
            preserveLineBreaks: false, // 保留换行符，默认false，必须与collapseWhitespace=true一起使用：true 保留换行符，false 保留换行符
            minifyCSS: true, // 在样式元素和样式属性中缩小CSS（使用干净的CSS），默认 false：true 压缩模板内的css
            minifyJS: true, // 在脚本元素和事件属性中缩小javascript（使用uglifyjs），默认 false：true 压缩模板内的js，并移除注释
            removeComments: true // 删除HTML注释，默认 false：true 删除html内的注释，只限html部分
          }
        }))

    });
  // console.log(entry, htmlWebpackPlugins)

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry: entry,
  plugins: [
  ].concat(htmlWebpackPlugins),
};
```

