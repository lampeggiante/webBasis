setTimeout(() => console.log('setTimeOut执行了~~~~~', new Date()), 0)

new Promise((resolve, reject) => {
  console.log('Promise执行了~~~~', new Date())
  resolve()
}).then(() => {
  setTimeout(() => console.log('then执行了~~~'), 3000)
})

console.log('宏任务执行完毕', new Date())
