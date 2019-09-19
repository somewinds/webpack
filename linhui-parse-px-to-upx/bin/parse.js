#!/usr/bin/env node
const program = require('commander');
const parseFiles = require('../src/parse-files.js');
 
program
  // 版本信息
  .version('0.0.1', '-v, --version')
  // 用法说明
  .usage('<file ...> [options]')
  // 选择名 选项描述 默认值
  // 选项 可以带有一个参数 可以通过 program.copy 获取该选项信息
  // 如果没有参数 该值为 true
  .option('-c, --copy <source>', 'copy file and add comment')
  .option('-H, --hashtag', `comment by '#'`)
  .option('-s, --slash', `comment by '/'`)
  .parse(process.argv);
  
function resolve(program) {
  // 没有匹配任何选项的参数会被放到数组 args 中
  const { copy, hashtag, slash, args } = program;
  if (!args.length) {
    console.log('Please input filename. 请输入要处理的文件，格式如：npm run parse a a/a1.vue');
    return;
  }
  parseFiles(args);
}

console.log('命令开始执行');
resolve(program);
