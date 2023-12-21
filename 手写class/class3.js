// 3. 组合继承
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

Dog.prototype = new Animal()
// Dog.prototype.constructor = Dog
console.log('Dog.prototype', Dog.prototype)

const dog1 = new Dog('扑扑', 2)
const dog2 = new Dog('飞飞', 3)
console.log('dog1.getName.prototype === dog2.getName.prototype', dog1.getName.prototype === dog2.getName.prototype)

// 此时已经能够实现不重复创建实例方法了，但是constructor的用处还不明朗
