fakeInterval = () => {
  let count = 1
  let interval = () => {
    console.log(`定时器执行了${count}s`)
    count ++
    if (count > 10) {
      console.log('定时器执行结束')
      clearTimeout(timer)
      return
    }
    timer = setTimeout(interval, 1000)
  }
  interval()
}

fakeInterval()
