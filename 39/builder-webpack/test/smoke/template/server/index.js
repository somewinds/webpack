if(typeof window === 'undefined'){
  global.window = {};
}

const fs = require('fs');
const path = require('path');

const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/index-server.js');
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8'); // 9. 加载模板，使用占位符，插入样式
const data = require('./data.json');
console.log(SSR)
// const SSR = require('../dist/search-server.js');

// 6. 将客户端的组件通过 renderToString 渲染成字符串


const server = (port) => {
  // 1. 实例化一个express
  const app = express();

  // 2. 设置静态目录
  app.use(express.static('dist'));
  // 3. 渲染
  app.get('/index', (req, res) => {
  // app.get('/search', (req, res) => {
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
  const dataStr = JSON.stringify(data)
  return template.replace('<!--HTML_PLACEHOLDER-->', str)
    .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.user = ${dataStr}</script>`);
  /* return `
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
  ` */
}
