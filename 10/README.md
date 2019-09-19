
## 15. 解析ES6和React JSX

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

## 16. 解析CSS、Less和Sass

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

## 17. 解析图片和文字

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

## 18. webpack中的文件监听

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

## 19. webpack中的热更新及原理分析

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

## 20. 文件指纹策略：chunkhash、contenthash和hash

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

## 21. HTML、CSS和JS代码压缩

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

## 22. 自动清理构建目录产物

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


## 23. PostCSS插件autoprefixer自动补齐CSS3前缀

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


## 24. 移动端CSS px自动转换成rem
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


## 25. 静态资源内联

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

## 26. 多页面应用打包通用方案

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

## 27. 使用sourcemap

作用：通过 sourcemap 定位到源代码  
开发环境开启，线上环境关闭


## 28. 提取页面公共资源

#### html-webpack-externals-plugin
1. 引入
```
npm i -D html-webpack-externals-plugin
```
2. 10\webpack.prod.js
```
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');


    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js', // https://unpkg.com/react@16/umd/react.development.js
          global: 'React'
        }, 
        {
          module: 'react-dom',
          entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js', // https://unpkg.com/react-dom@16/umd/react-dom.development.js
          global: 'ReactDOM'
        }
      ]
    })
```
3. 模板文件 10\src\index.html 引入CDN
```
<body>
  <div id="app"></div>
  <script type="text/javascript" src="https://11.url.cn/now/lib/16.2.0/react.min.js"></script>
  <script type="text/javascript" src="https://11.url.cn/now/lib/16.2.0/react-dom.min.js"></script>
</body>
```
4. 打包
```
npm run build
```
5. 打包后，react和react-dom通过CDN引入，包体积从 524k 缩小到 33.6k

#### optimization.splitChunks
1. 10\webpack.prod.js
```
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /(react|react-dom)/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
```
2. 将 splitChunks 的 name 添加到 htmlWebpackPlugins中，这样页面才能引用到
```
  // html模板及压缩
  new HtmlWebpackPlugin({
    chunks: ['vendors', pageName], // html使用那些chunk，包含所有入口文件
  }))
```
4. 打包
```
npm run build
```
5. 打包后，react和react-dom被分离出单独的js文件：bundle_vendors_d1a4f3d7.js

#### 提取其他公共文件：
1. 10\src\common\index.js
```
export function common() {
  return 'common module';
}
```
2. 10\webpack.prod.js
```
  optimization: {
    splitChunks: {
      minSize: 0, // 最小文件大小，小于此大小的不进行分离打包
      cacheGroups: {
        commons: {
          test: /(react|react-dom)/,
          name: 'vendors',
          chunks: 'all'
        },
        myCommons: { // 该模块的作用：被引用的次数大于等于2的文件被打包进名为 my_commons 的 chunk 内
          name: 'my_commons',
          chunks: 'all',
          minChunks: 2 // 最小引用文件的次数
        }
      }
    }
  }


  const entryFiles = glob.sync(path.join(__dirname, './src/!(common)*/index.js')); // 排除掉 common 文件夹
  // html模板及压缩
  new HtmlWebpackPlugin({
    chunks: ['vendors', 'my_commons', pageName], // html使用那些chunk，包含所有入口文件
  }))
```
3. 10\src\index\index.js
```
import { helloWorld } from "./helloworld";
import "./react-dom-search.js";
import { common } from "../common/index";

document.write(helloWorld());
document.write(common());
```
4. 10\src\search\index.js
```
import { common } from "../common/index";

document.write('search 入口');
document.write(common());
```
5. 打包
```
npm run build
```
6. 打包后，my_commons 被分离出单独的js文件：bundle_my_commons_08b106d8.js


## 29. tree shaking的使用和原理分析
tree shaking 摇树优化：摇树时会把没用的叶子摇掉，即 没用的代码在编译时不会被打包。mode: "production" 默认开启，none 关闭

DCE（Elimination）：
1. 代码不会被执行，不可到达
2. 代码执行的结果不会被用到
3. 代码只会影响死变量（只写不读）

```
if(false) {
  console.log('这段代码永远不会被执行');
}
```

tree-sharking 对无用的代码进行静态分析，在编译的时候对无用的代码进行注释标记，在 uglify 阶段删除注释的（无用的）代码。

1. 10\src\index\tree-sharking.js
```
// 测试 tree-sharking
export function a(){
  return '测试 tree-sharking a';
}

export function b(){
  return '测试 tree-sharking b';
}
```
2. 10\src\index\react-dom-search.js
```
import { a, b } from './tree-sharking'

if(false){
  console.log(b());
}

class Search extends React.Component {
  render() {
    const treeSharkingText = a();
    return <div class="search">
      <div>{ treeSharkingText }</div>
    </div>
  }
}

// 将 Search 渲染到 app 节点上
ReactDOM.render(
  <Search></Search>,
  document.getElementById('app')
);
```
3. 打包
```
npm run build
```
4. 打包后，10\dist\bundle_index_371acc9c.js 内能找到 "测试 tree-sharking a"，但是找不到 "测试 tree-sharking b"

## 30. Scope Hoisting使用和原理分析

普通打包：
1. 大量函数闭包包裹代码，导致体积增大（模块越多越明显）
2. 运行代码时创建的函数作用域名变多，内存开销变大

webpack 模块转换分析：
1. 被 webpack 转换后的模块会带上一层包裹
2. import 会被转换成 __webpack_require
3. export 也会被转换成处理后的结果

scope hositing  
- 原理：
将所有模块的代码按照模块，按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突。
- 对比：
通过 scope hositing 可以减少函数声明代码和内存开销。

webpack@3：new webpack.optimize.ModuleConcatenationPlugin()  
webpack@4：mode: 'production' 默认开启


## 31. 代码分割和动态import

首屏一般不会加载所有页面/文件，所以分割出来只加载需要的文件。

1. 抽离相同代码到一个共享块
2. 脚本懒加载，使初始下载代码更小

加载方式：
1. CommonJS：require.ensure
2. ES6：动态 import （目前还没有原生支持，需要 babel 转换）

使用jsonp去动态引入js

1. 安装babel
```
npm install --save-dev @babel/plugin-syntax-dynamic-import
```
2. .babelrc
```
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```
3. 新建一个用以动态加载的js文件
10\src\index\text.js
```
import React from 'react'

export default() => <div>动态 import</div>
```
4. 引入这个文件，并通过事件触发加载
10\src\index\react-dom-search.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import './search.css';
import './search.less';
import bakugou from '../images/bakugou.jpg';
import { a, b } from './tree-sharking'

if(false){
  console.log(b());
}

class Search extends React.Component {

  constructor(){
    super(...arguments);

    this.state = {
      Text: null
    }
  }

  loadComponent(){
    // 返回的是一个Promise对象
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default
      })
    })
  }

  render() {
    const { Text } = this.state;
    const treeSharkingText = a();
    return <div className="search">
      Search
      <div className="text">search-text</div>
      <img src={ bakugou } onClick={ this.loadComponent.bind(this) } />
      {
        Text ? <Text/> : null
      }
      <div>{ treeSharkingText }</div>
    </div>
  }
}

// 将 Search 渲染到 app 节点上
ReactDOM.render(
  <Search></Search>,
  document.getElementById('app')
);
```

## 32. webpack和ESLint结合

原则：
1. 不重复造轮子，给予 eslint:recommend 配置并改进
2. 能够帮助发小代码错误的规则，全部开启
3. 帮助保持团队的代码风格统一，而不是限制开发体验

1. 和 CI/CD 系统集成
2. 和 webpack 集成 eslint-babel


1. 引入 eslint 相关依赖
```
npm install --save-dev eslint eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y eslint-loader eslint-config-airbnb babel-eslint
```
2. 修改配置文件
10\webpack.prod.js
```

module.exports = {
 
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
    ]
  }
}
```
3. 引入 eslint 配置
.eslintrc.js

[ESLint - Pluggable JavaScript linter - ESLint中文](https://cn.eslint.org/)
```
module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "indent": ["error", 2]
  }
}
```
4. 编译

## 33. webpack打包组件和基础库

webpack 除了可以用来打包应用，也可以用来打包 js 库

实现一个大整数加法库的打包 LargeNumber，需求：
- 需要打包压缩版和非压缩版本
- 支持 AMD/CJS/ESM 模块引入
- 打包输出库的名称：
  - 未压缩版 large-number.js
  - 压缩版 large-number.min.js
- 支持 ES Module
```
import * as largeNumber from 'large-number'
// ...
largeNumber.add('999', '1');
```
- 支持 CJS
```
const largeNumber = require('large-number')
// ...
largeNumber.add('999', '1');
```
- 支持 AMD
```
require(['large-number'], function(largeNumber) {
  // ...
  largeNumber.add('999', '1');
}
```
- 可以直接通过 script 引入

如何将库暴露出去？
- library：指定库的全局变量
- libraryTarget：支持库引入的方式

Terser 区别于 uglifyjs，它在压缩的过程能识别ES6


测试用例
```
add('999', '1');
add('1', '999');
add('123', '321');
add('999999999999999999999999999999999999999999999999999999999999', '1');
```

1. 新建项目
large-number
```
npm init -y
npm i -D webpack webpack-cli
```
2. 新建方法库文件
large-number\src\index.js
```
// 大整数加法
export default function add(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;

  let carry = 0; // 进位
  let ret = ''; // 和
  while (i >= 0 || j >= 0) {

    let x = 0; // a的i位数上的值
    let y = 0; // b的j位数上的值
    let sum = 0; // 求和的值

    if (i >= 0) {
      x = +a[i];
      i--;
    }
    if (j >= 0) {
      y = +b[j];
      j--;
    }
    sum = x + y + carry;
    console.log(sum)
    if (sum >= 10) { // 如果sum大于等于10，减10并进一位
      carry = 1;
      sum -= 10;
    } else {
      carry = 0
    }
    // 将sum累加到ret字符串前 0 + ''
    ret = sum + ret;
  }

  // 计算完如果仍有进位，累加到ret
  if (carry) {
    ret = 1 + ret;
  }

  return ret;
}

// add('999', '1');
// add('1', '999');
// add('123', '321');
// add('999999999999999999999999999999999999999999999999999999999999', '1');
```
3. 新建配置文件
webpack.config.js
```
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
```
4. 引入依赖：压缩插件
```
npm i -D terser-plugin
```
5. package.json配置：
```
{
  "name": "large-number-cielsys",
  "version": "1.0.0",
  "description": "大整数加法",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "perpublish": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "terser-webpack-plugin": "^1.4.1",
    "webpack": "^4.39.3",
    "webpack-cli": "^3.3.7"
  }
}
```
6. package.json中main文件创建
```
if(process.env.NODE_ENV === 'production'){
  module.exports = require('./dist/large-number.min.js');
} else {
  module.exports = require('./dist/large-number.js');
}
```
7. 打包方法库
```
npm run build
```
8. 登录npm
```
npm login
```
9. 发布到npm
```
npm publish
```
10. 在项目中引入方法库
```
npm i -D large-number-cielsys
```
11. 使用方法库
10\src\index\react-dom-search.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import './search.css';
import './search.less';
import bakugou from '../images/bakugou.jpg';
import { a, b } from './tree-sharking'
import largeNumber from 'large-number-cielsys'

if(false){
  console.log(b());
}

class Search extends React.Component {

  constructor(){
    super(...arguments);

    this.state = {
      Text: null
    }
  }

  loadComponent(){
    // 返回的是一个Promise对象
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default
      })
    })
  }

  render() {
    const { Text } = this.state;
    const treeSharkingText = a();
    const addResult = largeNumber('999', '1');
    return <div className="search">
      Search
      <div className="text">search-text</div>
      <img src={ bakugou } onClick={ this.loadComponent.bind(this) } />
      {
        Text ? <Text/> : null
      }
      { addResult }
      <div>{ treeSharkingText }</div>
    </div>
  }
}

// 将 Search 渲染到 app 节点上
ReactDOM.render(
  <Search></Search>,
  document.getElementById('app')
);
```
12. 编译并查看 index.html
```
npm run build
```

## 34. webpack实现SSR打包（上）
1. 渲染：HTML + CSS + JS + DATA -> 渲染后的HTML
2. 服务端：
   - 所有模板等资源都存储在服务端
   - 内网机器拉取数据更快
   - 一个 HTML 返回所有数据
#### 优势；
1. 减少白屏时间
2. 对于 SEO 友好

#### 总结：服务端渲染(SSR:server side render)的核心是减少请求

#### 实现：
##### 服务端
- 使用 react-dom/server 的 renderToString 方法将 React 组件渲染成字符串
- 服务端路由返回对应的模板
##### 客户端
- 打包出针对服务端的组件

1. package.json
```
"build:ssr": "webpack --config webpack.ssr.js"
```
2. webpack.ssr.js
3. 10\server\index.js
```
const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/search-server.js');

// 6. 将客户端的组件通过 renderToString 渲染成字符串


const server = (port) => {
  // 1. 实例化一个express
  const app = express();

  // 2. 设置静态目录
  app.use(express.static('dist'));
  // 3. 渲染
  app.get('/search', (req, res) => {
    // 7. 返回渲染的内容
    const html = renderMarkup(renderToString(SSR));
    res.status(200).send(html);
  });

  // 5. 监听端口
  app.listen(port, () => {
    console.log('Server is running on port: ' + port);
  });
}

// 4. 设置 server 监听的端口
server(process.env.PORT || 3000);

// 8. 通过模板html将组件字符串包装进页面
const renderMarkup = (str) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    <div id="root">${str}</div>
  </body>
  </html>
  `
}

```
4. window is not defined
10\server\index.js
```
if(typeof window === 'undefined'){
  global.window = {};
}
```
5. document is not defined


## 34. webpack实现SSR打包（下）

1. 10\server\index.js

```
const fs = require('fs');
const path = require('path');

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8'); // 9. 加载模板，使用占位符，插入样式


// 8. 通过模板html将组件字符串包装进页面
const renderMarkup = (str) => {
  const dataStr = JSON.stringify(data)
  return template.replace('<!--HTML_PLACEHOLDER-->', str)
    .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.user = ${dataStr}</script>`);
}

```
2. 10\src\index.html

```
  <div id="root"><!--HTML_PLACEHOLDER--></div>

  <!--INITIAL_DATA_PLACEHOLDER-->
```
3. 10\server\data.json

```
{
  "name": "张三"
}
```

## 36. 优化构建时命令行的显示日志

##### stats
1. errors-only：只在发生错误时输出
2. minimal：只在发生错误或有新的编译时输出
3. none：没有输出
4. normal：标准输出
5. verbose：全部输出

##### friendly-errors-webpack-plugin
- success 构建成功
- warning 构建警告
- error 构建报错

6. 10\webpack.prod.js
```
  stats: 'errors-only'
```
2. 引入 friendly-errors-webpack-plugin
```
npm i -D friendly-errors-webpack-plugin
```
3. 10\webpack.prod.js
```
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

    // 友好的构建提示
    new FriendlyErrorsWebpackPlugin()
```

## 37. 构建异常和中断处理

- webpack4 之前的版本构建失败不会抛出错误码。
- Node.js 中的 process.exit 规范：
  - 0 表示成功完成，回调函数中，err 为 null
  - 非 0 表示执行失败，回调函数中，err 不为 null，err.code 就是传给 exit 的数字

#### 如何主动捕获并处理构建错误
1. compiler 在每次构建结束后会触发 done 这个 hook
2. process.exit 主动处理构建报错

10\webpack.prod.js
```
  plugins: [

    // 主动捕获并处理构建错误
    function(){
      this.hooks.done.tap('done', (stats) => {
        console.log('done');
        if(stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf('--watch') === -1){
            console.log('build error');
            process.exit();
          }
      })
    }
```

## 38. 构建配置包设计





