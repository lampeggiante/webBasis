/* 
  五种继承方式
    1.原型链继承
    2.借用构造函数实现继承
    3.组合继承
    4.寄生式组合继承
    5.class实现继承
*/

// 1.原型链继承
function Animal (name) {
  this.info = { name: name }
}

Animal.prototype.getName = function () {
  return this.info.name
}

function Dog () {}

Dog.prototype = new Animal('林')

let dog1 = new Dog()

// 这种继承形式中，后代可以修改父代的属性值
console.log('小狗的名字是：', dog1.getName())

dog1.info.name = '余'
console.log('小狗的新名字是：', dog1.getName())
// 此时哪怕创建父类实例，生成的名字也是后代修改过的
let dog2 = new Dog()
console.log('新的小狗还没改名，叫：', dog2.getName())
