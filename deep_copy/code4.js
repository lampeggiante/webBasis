// 木易杨
function cloneDeep1(source) {
  var target = {};
  for(var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
          if (typeof source[key] === 'object') {
              target[key] = cloneDeep1(source[key]); // 注意这里
          } else {
              target[key] = source[key];
          }
      }
  }
  return target;
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
var b = cloneDeep1(a);

a.name = "高级前端进阶";
a.book.price = "55";

console.log(b);
// { 
//   name: 'muyiy', 
//   book: { title: 'You Don\'t Know JS', price: '45' }, 
//   a1: undefined,
//   a2: {},
//   a3: 123
// }

// 1、没有对传入参数进行校验，传入 null 时应该返回 null 而不是 {}
// 2、对于对象的判断逻辑不严谨，因为 typeof null === 'object'
// 3、没有考虑数组的兼容
