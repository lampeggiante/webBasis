/* 
  new 关键字的背后是三件事
    1. 创建一个对象，对象的原型指向构造函数的原型
    2. 调用该构造函数，构造函数的this指向新生成的对象
    3. 判断函数是否有返回值，如果有返回值且返回值是一个对象或一个方法，则返回该值，否则返回新生成的对象
*/
function newFn (FN, ...args) {
  const instance = Object.create(FN.prototype)
  let res = FN.apply(this, args)
  return typeof res === 'object' || typeof FN === 'function'? res: instance
}

function Dog(name) {
  this.name = name;
  return { test: 1 };
}
let obj = newFn(Dog, 'ming')
console.log(obj) // { test: 1 }