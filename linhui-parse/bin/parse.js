#!/usr/bin/env node
const program = require('commander');
const parseFiles = require('../src/index.js');
 
program
  // 版本信息
  .version('0.0.1', '-v, --version')
  // 用法说明
  .usage('<file ...> [options]')
  // 选择名 选项描述 默认值
  // 选项 可以带有一个参数 可以通过 program.copy 获取该选项信息
  // 如果没有参数 该值为 true
  // .option('-c, --copy <source>', 'copy file and add comment')
  // .option('-H, --hashtag', `comment by '#'`)
  // .option('-s, --slash', `comment by '/'`)
  .option('-p, --prop <num>', `num：px转换为upx的系数，默认 2，即 1px => 2upx`)
  .parse(process.argv);
  
function resolve(program) {
  // 没有匹配任何选项的参数会被放到数组 args 中
  const { prop, args } = program;
  if (!args.length) {
    console.log('Please input filename. 请输入要处理的文件，格式如：npm run parse a a/a1.vue');
    return;
  }
  // 获取转换系数：undefined 未使用选项，true 使用但未带入值， xxx 使用了并带入了值xxx
  if (prop === true) {
    console.log('使用了选项 --prop，但未带入值<num>');
  } else if(prop) {
    console.log(`使用了选项 --prop，并带入值 ${prop}`);
  }
  parseFiles(args, +prop);
}

console.log('命令开始执行');
resolve(program);
