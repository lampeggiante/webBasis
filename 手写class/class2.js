// 2. 构造函数式继承
function Animal (name) {
  this.name = name
  this.getName = function () {
    return this.name
  }
}

function Dog (name) {
  Animal.call(this, name)
}

Dog.prototype = new Animal()

// 调试
let dog1 = new Dog('陈')
let dog2 = new Dog('李')
console.log('dog1.getName', dog1.getName())
console.log('dog2.getName', dog2.getName())

console.log('dog1.getName.prototype === dog2.getName.prototype:', dog1.getName.prototype === dog2.getName.prototype)

// 虽然解决了类型共享和传参的问题，但是方法定义在构造函数里面，每次创建子类都会重新创建一次方法
