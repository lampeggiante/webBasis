/* 
  1. async 是 generator (迭代函数)的语法糖
  2. async 函数返回的是一个 Promise 对象，有无值看有无 return
  3. await 关键字只能放在 async 函数内部，await 关键字的作用就是获取 Promise 中返回的 resolve 或者 reject 的值
  4. async、await要结合 try/catch 使用，防止意外的错误
*/

// 使用 generator 函数重写以下demo
const getData = () => new Promise((resolve) => setTimeout(() => resolve('data'), 1000));
async function test() {
  const data = await getData();
  console.log('data: ', data);
  const data2 = await getData();
  console.log('data2: ', data2);
  return 'success';
}
test().then((res) => console.log('test:', res));

function* testG () {
  const data = yield getData()
  console.log('data:', data)
  const data2 = yield getData()
  console.log('data2:', data2)
  return 'success'
}
var gen = testG()
var dataPromise = gen.next();
dataPromise.value.then((value1) => {
  // data1的value被拿到了，继续调用next
  var data2Promise = gen.next(value1)
  data2Promise.value.then((value2) => {
    // data2的value拿到了 继续调用next并且传递value2
    gen.next(value2)
  })
})
