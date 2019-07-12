# webpack
### 初始化一个简单的webpack测试项目：

1. 安装
```
npm init -y

npm install webpack webpack-cli html-webpack-plugin --save-dev
```

2. 新建配置文件：

webpack.config.js
```
const path = require('path');
// const HtmlWebpackPlugin = require('HtmlWebpackPlugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin')

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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
```

3. 新建模板文件：

index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

  <!-- <script src="./bundle_index.js"></script> -->
  <!-- <script src="./bundle_search.js"></script> -->
  
</body>
</html>
```

helloworld.js
```
export function helloWorld(params) {
  return 'helloWorld';
}
```

index.js
```
import { helloWorld } from './helloworld.js';

document.write(helloWorld());
```

search.js
```
document.write('search');
```

4. 配置package.json：
```
"build": "webpack"
```
否则以该命令打包：
```
node_modules\.bin\webpack
```

5. 引入打包后的js文件

dist/index.js
```
<script src="./bundle_index.js"></script>
<script src="./bundle_search.js"></script>
```