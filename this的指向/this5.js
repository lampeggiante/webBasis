/* 
  箭头函数的函数作用域是由外层决定的
*/
obj = {
  a: 2,
  foo1: () => {
    console.log('this.a=', this.a)
  },
  foo2: function () {
    return () => {
      console.log(this.a)
    }
  }
}
obj.foo1()
obj.foo2()()
