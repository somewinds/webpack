## 工具类函数：处理 uni-app 文件，将文件内的 px 按系数替换为 upx

##### 系数默认 2，即 1px => 2upx

### 使用

1. 引入依赖
```
npm install --save-dev linhui-parse-px
```
2. 设置命令脚本
D:\xampp\htdocs\cielsys\study\webpack\ciel-touchme
```
{
  "name": "ciel-touchme",
  "scripts": {
    "parse": "linhui-parse"
  }
}
```
3. 执行脚本
```
npm run parse test/a/b/b1.scss

npm run parse test
```
<!-- ![image](190FD2D8AA9A405384D62641B57966F4)
![image](79F758ADCC464B8085D4EF590863BDBB) -->
