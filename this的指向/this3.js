/* 
  调用 foo 的对象是window，打印出来的应该是全局的 a
*/
var a = 1
function foo () {
  var a = 2
  console.log(this)
  console.log(this.a)
}
foo()
