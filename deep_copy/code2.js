// https://www.cnblogs.com/sweet-ice/p/10583192.html

function deepClone (data) {
  const type = judgeType(data)
  let obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    return data
  }

  if (type === 'array') {
    for (let i = 0; i < data.length; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (const key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}

function judgeType(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

// 第一个测试用例
var test1 = {
  name: 'a',
  date: [new Date(1536627600000), new Date(1540047600000)],
}

let b
b = deepClone(test1)
console.log(test1)
console.log(b)

// 第二个测试用例
const test2 = {
  name: 'a',
  date: new RegExp('\\w+'),
}
// debugger
const copyed = deepClone(test2)
test2.name = 'test2'
console.error('ddd', test2, copyed)
