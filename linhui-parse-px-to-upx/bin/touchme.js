#!/usr/bin/env node
const program = require('commander');
// const gen = require('../lib/generate-file');
 
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
    console.log('Please input filename.');
    return;
  }
  if (copy === true) {
    console.log('You should copy at least one file.');
    return;
  }
  let type = 'star'; // 类型
  if (slash) type = 'slash';
  if (hashtag) type = 'hashtag';
  for (let i = 0; i < args.length; i++) {
    console.log('运行成功：', args[i], type);
    // console.log(args[i], copy, type);
    // gen(args[i], copy, type);
  }
}

resolve(program);

console.log('console.log output')