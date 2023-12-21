/* 
  setTimeOut 会让作用域内部的 this 隐式地被转化为 window 对象
  要使用 funtion () {} 定义函数才有这种情况，箭头函数没有这种情况
*/
let a = 3
obj = {
  a: 2,
  foo1: function () {
    console.log('this.a=', this.a)
  },
  foo2: function () {
    setTimeout(function () {
      console.log("this=", this)
      console.log('this.a=', this.a)
    })
  }
}
obj.foo1()
obj.foo2()
