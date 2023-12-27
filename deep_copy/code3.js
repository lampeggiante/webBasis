// https://github.com/yygmind/blog/issues/29
// 木易杨
function cloneShallow(source) {
  var target = {};
  for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
      }
  }
  return target;
}

// 测试用例
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
var b = cloneShallow(a);

a.name = "高级前端进阶";
a.book.price = "55";

console.log(b);
// { 
//   name: 'muyiy', 
//   book: { title: 'You Don\'t Know JS', price: '55' },
//   a1: undefined,
//   a2: null,
//   a3: 123
// }
