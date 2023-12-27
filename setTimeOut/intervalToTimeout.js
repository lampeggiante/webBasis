fakeTimeout = (fn, interval) => {
  let timer = setInterval(() => {
    fn()
    clearInterval(timer)
  }, interval)
}

console.log('第一个宏任务执行完毕', new Date())
fakeTimeout(() => console.log('fakeTimeout', new Date()), 1000)
