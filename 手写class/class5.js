// class实现继承
class Animal {
  constructor (name) {
    this.name = name
    this.colors= ['yellow', 'white']
  }
  getName () {
    return this.name
  }
}

class Dog extends Animal {
  constructor (name, age) {
    super(name)
    this.age = age
  }
}

console.log('Dog.prototype', Dog.prototype)

const dog1 = new Dog('扑扑', 2)
const dog2 = new Dog('飞飞', 3)
console.log('dog1.getName.prototype === dog2.getName.prototype', dog1.getName.prototype === dog2.getName.prototype)

console.log('dog1的name', dog1.getName())
console.log('dog2的name', dog2.getName())
