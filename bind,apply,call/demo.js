/* 
  call方法，第一个参数为 this指向，第二个之后的参数为传入函数的参数
*/
Function.prototype.Call = function (context, ...args) {
  if (context === undefined || context === null) {
    context = window
  }
  fn = Symbol('fn')
  // 当属性名为Symbol类型时，不能使用点表示法，只能用中括号表示法
  context[fn] = this
  let results = context[fn](...args)
  delete context[fn]
  return results
}

/* 
  apply 方法，和call方法只有在参数上有差距，此时args是一个数组
*/
Function.prototype.Apply = function (context, args) {
  if (context === undefined || context === null) {
    context = window
  }
  fn = Symbol('fn')
  context[fn] = this
  let results = context[fn](...args)
  delete context[fn]
  return results
}

/* 
  bind方法
*/
Function.prototype.Bind = function (context, ...args) {
  if (context === undefined || context === null) {
    context = window
  }
  let f = this
  let fn = Symbol('fn')
  const result = function (...args1) {
    // 需要分情况讨论，是否为构造函数
    if (this instanceof f) {
      // 此时是构造函数，new了一个新对象
      this[fn] = f
      let res = this[fn](...args, args1)
      delete this[fn]
      return res
      // return f.apply(this, [...args, ...args1])
    } else {
      // 此时为普通函数调用
      context[fn] = f
      let res = context[fn](...args, ...args1)
      delete context[fn]
      return res
    }
  }
  // 函数定义好之后要绑定原型链，使用Object.create方法绑定原型
  result.prototype = Object.create(f.prototype)
  return result
}

const moduleObj = {
  x: 42,
  getX: function () {
    return this.x;
  },
};
const unboundGetX = moduleObj.getX;
const boundGetX = unboundGetX.Bind(moduleObj);
console.log(boundGetX());
// Expected output: 42

const numbers = [5, 6, 2, 3, 7];

const max = Math.max.Apply(null, numbers);

console.log(max);
// Expected output: 7

const min = Math.min.Apply(null, numbers);

console.log(min);
// Expected output: 2