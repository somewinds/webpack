const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
  timeout: 10000 // 超时时间10s
});

// 进入到 template 项目内，对其进行打包测试
process.chdir(path.join(__dirname, 'template'));

// 删除 dist 并进入回调
rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.prod.config.js');

  // 编译
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err);
      process.exit(2); // 以错误码退出
    }
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false
    }));

    console.log('开始执行测试用例');

    // 引入测试用例
    mocha.addFile(path.join(__dirname, 'html-test.js'));
    mocha.addFile(path.join(__dirname, 'css-js-test.js'));

    mocha.run();
  });
});