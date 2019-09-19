/*工具类函数：处理文件，将文件内的 px替换为upx

如：12px 替换为 24px（倍数系数为2）
在根目录执行命令：
node ./utils/parsePxToUpx.js 后可传入多个文件，以空格隔开：
node ./utils/parsePxToUpx.js components/change-city
node ./utils/parsePxToUpx.js target.vue
node ./utils/parsePxToUpx.js ./target.vue
node ./utils/parsePxToUpx.js ./aaa/target.vue
node ./utils/parsePxToUpx.js target.vue ./aaa/target.vue */

const fs = require('fs');
const path = require('path');

/* function resolve(dir) { // 根目录
  return path.join(__dirname, '..', dir);
} */

// 执行：nodex index.js
/* const files = process.argv.splice(2); // 获取执行时传入的参数
readFiles(files); // 遍历文件：如果是文件夹，递归遍历；如果是文件且后缀满足 /((\.vue)|(\.css)|(\.scss))$/，处理px */

// common.js方式抛出方法
module.exports = readFiles;

// px转换为upx的系数，默认 2，即 1px => 2upx
let proportion = 2;

/**
 * @description: 传入的文件数组遍历
 * @param {type} files 文件数组
 * @param {type} files px转换为upx的系数，默认 2，即 1px => 2upx
 * @return: 
 */
function readFiles(files, prop = 2) {
  if(prop && typeof +prop === 'number' && prop > 0){
    proportion = +prop;
  }
  console.log('准备转换了，参数如下：', files, proportion);
  files.forEach(filePath => {
    readFile(filePath);
  });
}

// 根据文件路径递归文件夹读取文件
function readFile(filePath) {
  fs.stat(filePath, (err, stats) => {
    // console.log(err, stats)
    if (err) {
      console.log(err);
    } else if (stats.isDirectory()) { // 如果是文件夹，递归遍历
      // 遍历文件夹下的文件，并拼接上父级路径
      fs.readdir(filePath, (err, files) => {
        if (err) throw err;
        files.forEach(filename => {
          filename = path.join(filePath, filename);
          readFile(filename);
        });
      });
    } else if (stats.isFile()) { // 如果是 .vue|.css|.scss 文件，处理px
      if (/((\.vue)|(\.css)|(\.scss))$/.test(filePath)) {
        // console.log(`${filePath} 是 .vue|.css|.scss 文件，处理px`, stats);
        parseFile(filePath);
      }
    }
  });
}

// 处理文件，获取文件内数据，将 px 根据比例等价（默认 1:2）替换为 upx，然后替换原文件数据
function parseFile(filePath = null) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;
    const newData = replacePXToUpx(data);
    fs.writeFile(filePath, newData, 'utf8', (err) => {
      if (err) throw err;
      console.log(`success done: ${filePath}`);
    });
  });
}

/**
 * @description: 快捷替换并换算px至upx
 * @param {type} str 被替换的字符串
 * @return: 
 */
function replacePXToUpx(str) {
  const PX_REGEXP = /(\d+(\.\d+)?)px/g;
  const newStr = str.replace(PX_REGEXP, function(word, letter) {
    // console.log(word, letter);
    return `${letter * proportion}upx`;
  });
  return newStr;
}
