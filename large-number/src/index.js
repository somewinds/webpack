// 大整数加法
export default function add(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;

  let carry = 0; // 进位
  let ret = ''; // 和
  while (i >= 0 || j >= 0) {

    let x = 0; // a的i位数上的值
    let y = 0; // b的j位数上的值
    let sum = 0; // 求和的值

    if (i >= 0) {
      x = +a[i];
      i--;
    }
    if (j >= 0) {
      y = +b[j];
      j--;
    }
    sum = x + y + carry;
    console.log(sum)
    if (sum >= 10) { // 如果sum大于等于10，减10并进一位
      carry = 1;
      sum -= 10;
    } else {
      carry = 0
    }
    // 将sum累加到ret字符串前 0 + ''
    ret = sum + ret;
  }

  // 计算完如果仍有进位，累加到ret
  if (carry) {
    ret = 1 + ret;
  }

  return ret;
}

// add('999', '1');
// add('1', '999');
// add('123', '321');
// add('999999999999999999999999999999999999999999999999999999999999', '1');