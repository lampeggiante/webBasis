isObject = (obj) => {
  return typeof obj === 'object' && obj !== null
}

deepClone2 = (source) => {
  if (!isObject(source)) return source
  let target = Array.isArray(source) ? [] : {}
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = deepClone2(source[key])
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}

var a = {
  name: "muyiy",
  book: {
      title: "You Don't Know JS",
      price: "45"
  },
  a1: undefined,
  a2: null,
  a3: 123
}
var b = deepClone2(a);

a.name = "高级前端进阶";
a.book.price = "55";

console.log(b);

// 还没有解决循环引用的问题
