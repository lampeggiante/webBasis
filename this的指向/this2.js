/* 
  let, const 不会将对象绑定在 window 对象上
*/

let a = 10
const b = 20
function foo () {
  console.log('this.a:', this.a)
  console.log('this.b:', this.b)
}
foo()
