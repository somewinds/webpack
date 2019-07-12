### 解析ES6和React JSX

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

### 解析CSS、Less和Sass

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

### 解析图片和文字

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