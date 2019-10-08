const glob = require('glob-all');

describe('Checking generated css js files', () => {
  it('should generate css js files', (done) => {
    const files = glob.sync([
      './dist/index_*.css', // 通配符的方式匹配文件名
      './dist/index.js'
    ]);

    if (files.length) {
      done();
    } else {
      throw new Error('no css js files generated');
    }
  });
});