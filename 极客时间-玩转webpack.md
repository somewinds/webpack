# webpack

## 1.课程介绍：

#### 为什么要深入掌握webpack？
1. 与应用场景和开发方式息息相关：
    需要同时兼顾PC、H5等各类不同分辨率的网页开发，针对不同的场景，做不同的打包配置。
2. 整个Node.js社区异常繁荣：
    Node.js自20019发布以来，已经有80多万的第三方组件，而npm的组件在浏览器的JS代码中并不能直接引入，这个时候就需要借助webpack等构建工具，来快速复用各种优秀成熟的组件，从而加速web开发。
3. 三大框架的语法需要构建工具来进行转换：
    比如 JSX 和 Vue 指令，这些在浏览器都是无法直接解析的，需要借用构建工具进行转换。

## 2. 内容综述

1. 基础篇：掌握webpack的核心理念和开发必备技巧
    - webpack 与构建发展简史
    - webpack 基础用法
    - webpack 进阶用法
2. 进阶篇：编写webpack的构建配置并掌握优化策略
    - 编写可维护的 webpack 构建配置
    - webpack 构建速度和体积优化策略
3. 原理篇：剖析内部运行原理并编写自定义Loader和插件
    - 通过源码掌握 webpack 打包原理
    - 编写 Loader 和插件
4. 实战篇：通过webpack商城项目实战牢固掌握所学知识
    - React 全家桶和 webpack 开发商城项目


![image](EFB6EF27B7D44A58A75AAABB0F962003)
![image](6140A11BC564450BA1083CCF47163E0C)
![image](DFA87DD9BDAC4001B09FE2F671391441)
![image](153F571E7F84430890D0ED30A83B7EA9)



## 3. 为什么需要构建工具

1. 转换 ES6 语法（下图标红都是不支持ES6语法的浏览器版本）
2. 转换 JSX、Vue、Angular（指令）
3. CSS 前缀补全（-webkit-、-moz-）/预处理器（less、sass）
4. 压缩混淆
5. 图⽚压缩 

![image](24DFE276FBC3427E9A3686DBA2FBCD73)
ES6 module 主流浏览器⽀持情况

## 4. 前端构建演变之路

![image](7FE994EBFE724F9787FCC104C8F2DB34)

1. 切图片，编写html、css、js，没有压缩
2. 代码发布上线后，希望对代码进行混淆，让代码的逻辑不那么容易暴露出来
3. 通过一些压缩工具，本地进行压缩，然后将压缩结果上传到服务器
4. 到07年出了 Yui Tool，结合ant，对代码进行压缩
5. 随着业界模块化的编些方式越来越复杂，演变出了grunt工具，将整个构建过程分为一个个的任务，对代码、图片进行解析压缩，但是使用本地磁盘进行IO操作，打包速度慢
6. 进而演变出了gulp，也是任务打包器，每个构建的结果直接存放在内存，下一个步骤能直接使用上一个步骤的内存，加速打包速度
7. 这个阶段百度推出了fis3工具，对资源控制的颗粒度比较精细，但现在已经不再对其进行维护
8. 现阶段使用最广泛的还是webpack，当然还要rollup和parcel
9. 除了以上这些，还有其他一些构建工具


## 5. 为什么选择 webpack?
![image](060B00BC664849D1ABFB47368BDA7C29)

1. 社区生态丰富，官方的插件数量也很丰富
2. 配置灵活和插件化扩展
3. 官方更新迭代速度快（目前是webpack@4，差不多一年一个版本）

[webpack 中文文档](https://www.webpackjs.com/concepts/)

![image](C8D4A6597C0049DB8FF7840A43B7E192)
![image](C95ADF50485C4271A7538916F7F7E2B4)


## 6. 初识 webpack：webpack 配置组成

![image](551D8494D8AF43CF93A13CEC80A480D4)

webpack 默认配置文件：webpack.config.js，也可以通过 webpack --config 指定配置文件



## 7. 环境搭建：安装 Node.js 和 NPM


1. 安装 nvm（https://github.com/nvm-sh/nvm）
    - 通过 curl 安装：curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
    - 通过 wget 安装：wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
2. 安装 Node.js 和 NPM
    - nvm install v10.15.3
    - 检查是否安装成功：node -v, npm -v

![image](F4EEF394D7814997A2DAB801A1370887)



#### 环境搭建：安装 webpack 和 webpack-cli

1. 创建空⽬录和 package.json
    - mkdir my-project
    - cd my-project
    - npm init -y

```
npm init -y
```
![image](7458C409B1424B27BB8733CFEB730F29)

2. 安装 webpack 和 webpack-cli
    - npm install webpack webpack-cli --save-dev
    - 检查是否安装成功：./node_modules/.bin/webpack -v

```
npm install webpack webpack-cli html-webpack-plugin --save-dev
```
![image](22B0A9B1A572494DB0A955D89762B89E)
![image](E991AAD64ABD4200AB8FEE2823935EC5)
![image](980EFBF5185E4AB2966F7CB6B9D0B5B3)

test\package.json
```
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.39.3",
    "webpack-cli": "^3.3.7"
  }
}

```


```
./node_modules/.bin/webpack -v
// 或 win
.\node_modules\.bin\webpack -v
```
![image](297154CADE734E38837B69500AE0BB95)


## 8. Webpack初体验：⼀个最简单的例⼦


1. 安装
```
npm init -y

npm install webpack webpack-cli html-webpack-plugin --save-dev
```
2. 新建配置文件
test\webpack.config.js
```
'use strict';

const path = require('path');

module.exports = {
  /* entry: {
    index: './src/index.js',
    search: './src/search.js'
  }, */
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    // filename: 'bundle_[name].js'
    filename: 'bundle.js'
  },
  mode: 'production',
  plugins: [
    /* new HtmlWebpackPlugin({
      template: './src/index.html'
    }) */
  ]
}
```
3. 创建一个函数js
test\src\helloworld.js
```
export function helloworld() {
  return 'hello webpack'
}
```
4. 创建入口文件
test\src\index.js
```
import { helloworld } from './helloworld';

document.write(helloworld());
```
5. 直接运行webpack，默认读取 webpack.config.js 的配置
```
.\node_modules\.bin\webpack
```
![image](060E6EF11D6F4DC4BFCE364CC753298E)
6. 打包结果
test\dist\bundle.js
![image](3DE85AE57BD64FAEB7E6A8931896938D)
![image](E1C42D5D6EF8499EA381FBF6EB53722A)
7. 创建一个模板文件，引入打包厚的 bundle.js，查看打包结果
test\index.html
```
<!DOCTYPE html>
<html lang='en'>

<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <meta http-equiv='X-UA-Compatible' content='ie=edge'>
  <title>Document</title>
</head>

<body>
  <script src="dist/bundle.js"></script>
</body>

</html>
```
![image](67D72305C6094966A44B8F6EB6549737)

以上的打包过程是很麻烦的，下面介绍简单的办法。


## 9. 通过 npm script 运⾏ webpack

![image](B4D070F767AE45D8BBF0EBD978182B3D)

1. test\package.json
```
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.39.3",
    "webpack-cli": "^3.3.7"
  }
}

```
2. 编译
```
npm run build
```

![image](C380C6BFE7C64A6283388AB6274BD2EE)
3. 模板文件 test\index.html 引入打包后的 bundle.js

上面引入打包js也是比较麻烦的，之后介绍使用模板文件自动引入js文件生成新的html文件


## 10. 核⼼概念之 Entry

Entry ⽤来指定 webpack 的打包⼊⼝

![image](EF9A7DCFEDA1461DAA57D91CC2F9C997)

- 依赖图的⼊⼝是 entry
- 对于⾮代码⽐如图⽚、字体依赖也会
不断加⼊到依赖图中

1. 根据入口文件（package.json）找到依赖文件
2. 依赖文件也可能会依赖其他的文件
3. 这样就生成了一个依赖依赖树
4. 只要遇到依赖，就会将其加入到依赖树中

> 不像大多数模块打包机，webpack 是将项目看成一个整体，通过一个给定的主文件（package.json），webpack开始从这个文件找到项目的所有依赖文件，然后使用 loaders 处理它们，最后生成一个或多个浏览器可识别的js文件。

1. 单入口（单页应用）
```
module.exports = {
  entry: './src/index.js',
}
```
2. 多入口（多页应用）
```
module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
}
```


## 11. 核⼼概念之 Output

Output ⽤来告诉 webpack 如何将编译后的⽂件输出到磁盘。

- 具体输出到磁盘的哪个目录，输出的文件名称，这些都可以通过 output 来进行指定。
- 和 entry 多入口不同，output 并没有“多出口”这个概念

- entry 对应源代码
- output 对应转换后的最终结果代码

1. entry 单入口时，output配置
```
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
}
```
2. entry 多入口时，output配置：  
通过占位符确保名称的唯一
```
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle_[name].js'
  },
}
```


#### 多入口测试：

1. 修改多入口配置
test\webpack.config.js
```
'use strict';

const path = require('path');

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
  plugins: [
    /* new HtmlWebpackPlugin({
      template: './src/index.html'
    }) */
  ]
}
```
2. 新建第二个入口文件
test\src\search.js
```
document.write('search page');
```
3. 编译
```
npm run build
```
![image](589244FF5EA44DE2869661720ACEFE73)
![image](FA6AB696C21F4148A6CEC9658147C5A4)
3. 新建第二入口模板文件
test\search.html
```
<!DOCTYPE html>
<html lang='en'>

<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <meta http-equiv='X-UA-Compatible' content='ie=edge'>
  <title>Document</title>
</head>

<body>
  <script src="dist/bundle_search.js"></script>
</body>

</html>
```
![image](E920ACF99EEC45C3A4A66275455C9E0E)


## 12. 核⼼概念之 Loaders

- webpack 开箱即用只支持 JS 和 JSON 两种文件类型
- 通过 Loaders 去支持其它文
件类型并且把它们转化成有效的模块（如 将less转为css，使其能够被浏览器识别），并且可以添加到依赖图中。
- 本身是一个函数，接受源文件作为参数，返回转换的结果。


#### 常⻅的 Loaders 有哪些？
![image](C19E493792D44E6BB061281E15204882)


Loaders 的⽤法：使用 less-loader 解析 less

1. 引入loader
```
npm install style-loader url-loader less less-loader --save-dev
```
![image](98BF66E6DDA44BECB39E30148D10C633)
2. 配置 loaders
test\webpack.config.js
```
module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle_[name].js'
  },
  mode: 'production',
  module: {
    rules: [
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
  }
}
```
3. 创建一个 less 样式文件
test\src\index.less
```
.box {
  min-width: 200px;
  min-height: 140px;
  border: 1px solid red;
  border-radius: 5px;
  padding: 20px;
  transition: all 0.4s ease;

  &:hover {
    transform: translateX(20px);
  }

  .item {
    width: 100px;
    height: 100px;
    background: blue;
    padding: 10px;
  }
}
```
3. 入口文件引入 less 文件
test\src\index.js
```
import { helloworld } from './helloworld';
import './index.less';

document.write(helloworld());
```
3. 模板文件添加样式对应的DOM节点
test\index.html
```
<!DOCTYPE html>
<html lang='en'>

<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <meta http-equiv='X-UA-Compatible' content='ie=edge'>
  <title>Document</title>
</head>

<body>
  <script src="dist/bundle_index.js"></script>

  <div class="box">
    <div class="item"></div>
  </div>
</body>

</html>
```
4. 编译
![image](8C7054039F784DFA918BF0C440391573)

![image](496052B49B8141B98895D673B0863AE5)
![image](5ECB6E7B86464755B89DAF541025E1E3)

![image](59621B21901B4FA2AA56EE5377430B5F)


## 13. 核⼼概念之 Plugins

- 插件⽤于 bundle ⽂件的优化，资源管理和环境变量注⼊
- 作⽤于整个构建过程
- 可以理解为，loaders无法做到的事，可以通过 plugins 来完成

常⻅的 Plugins 有哪些？

![image](8B148BAE023442BCB429E1320B049DCF)

Plugins 的⽤法：使用  在构建前自动清理构建目录

1. 引入
```
npm install --save-dev clean-webpack-plugin
```
2. 配置
test\webpack.config.js
```
'use strict';

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle_[name].js'
  },
  mode: 'production',
  module: {
    rules: [
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
  ]
}
```
3. 编译
![image](88CE382748854B73BB5CD3A7942E8611)

## 14. 核⼼概念之 Mode

- Mode ⽤来指定当前的构建环境是：production、development 还是 none
- 设置 mode 可以使⽤ webpack 内置的函数，默认值为 production
- webpack@4提出的

Mode 的内置函数功能
![image](91F345D533B5434CB50BBB68FB2460B8)

```
module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle_[name].js'
  },
  mode: 'production',
  module: {
    rules: [
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
  ]
}
```

---

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