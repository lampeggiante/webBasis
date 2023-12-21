// 寄生式组合继承
// 之前的方法中，调用了两次Animal方法
// 解决方法是不直接调用父类的构造函数，而是创建空函数获取父类原型的副本
function Animal (name) {
  this.name = name,
  this.colors = ['yellow', 'white']
}

Animal.prototype.getName = function () {
  return this.name
}

function Dog (name, age) {
  Animal.call(this, name)
  this.age = age
}

Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog
console.log('Dog.prototype', Dog.prototype)

const dog1 = new Dog('扑扑', 2)
const dog2 = new Dog('飞飞', 3)
console.log('dog1.getName.prototype === dog2.getName.prototype', dog1.getName.prototype === dog2.getName.prototype)

console.log('dog1的name', dog1.getName())
console.log('dog2的name', dog2.getName())
