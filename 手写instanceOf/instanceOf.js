function instanceOfFn (obj1, Fn) {
  let proto = obj1.__proto__
  console.log('proto=', proto)
  if (proto) {
    if (proto === Fn.prototype) {
      return true
    } else {
      return instanceOfFn(proto, Fn)
    }
  } else {
    return false
  }
}

function Dog() {}
let dog = new Dog();

// test
console.log('instanceOfFn(Object, Object)', instanceOfFn(Object, Object))
console.log('instanceOfFn(Function, Function)', instanceOfFn(Function, Function))
console.log('instanceOfFn(function () {}, Function)', instanceOfFn(function () {}, Function))
console.log('instanceOfFn(dog, Dog)', instanceOfFn(dog, Dog))
console.log('instanceOfFn(Dog, Object)', instanceOfFn(Dog, Object))

/* 
  instanceof 和 typeof 的区别
    1. typeof 可以判断一个变量的类型
      typeof 可以判断 number, undefinedm, symbol, string, function, boolean, object七种数据类型，特殊情况是 typeof null === 'object'
    2. instanceof 判断一个对象的原型链上是否包含该构造函数的原型
*/
