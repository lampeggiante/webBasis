/* 
  var 会将变量直接绑定到 window 对象上面
*/
'use strict'
var window = this
var a = 10
function foo () {
  // 会打印出来 undefined
  console.log('func:this:', this)
  // 这里也是 undefined, 在网页中应该是 10，因为 window 是全局对象
  console.log('window.a:', window.a)
  // 会报错，函数内部没有 a 变量
  console.log('this.a', this.a)
}
// 打印 window 对象
console.log('global:this:', this)
foo()
