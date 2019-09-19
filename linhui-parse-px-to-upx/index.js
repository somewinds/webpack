if(process.env.NODE_ENV === 'production'){
  module.exports = require('./dist/linhui-parse-px-to-upx.min.js');
} else {
  module.exports = require('./dist/linhui-parse-px-to-upx.js');
}