class selfPromise {
  constructor (fn) {
    // resolve 执行列表
    this.resolveTask = []
    // reject 执行列表
    this.rejectTask = []
    // state 表明当前状态，分为三个状态，pending, fullfilled, rejected
    this.state = 'pending'
    let resolve = (value) => {
      // 如果为pending则返回
      if (this.state !== 'pending') return
      this.state = 'fullfilled'
      this.data = value
      // 模拟异步，保证resolveTask先注册成功，要考虑在Promise里面写同步代码的情况
      setTimeout(() => {
        this.resolveTask.forEach(cb => cb(value))
      })
    }
    let reject = (e) => {
      if (this.state !== 'pending') return
      this.state = 'rejected'
      this.error = e
      // 保证 rejectTask 事件注册成功
      setTimeout(() => {
        this.rejectTask.forEach(cb => cb(e))
      })
    }

    // 执行 fn
    try {
      fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then (resolveCallback, rejectCallback) {
    // 形成链式回调
    return new selfPromise((resolve, reject) => {
      // 将 then 传入 回调函数中，注册到resolveTask中
      this.resolveTask.push(() => {
        // 加入用户注册的 resolveCallback 事件又返回一个 Promise，将 resolve 和 reject 传进去，这样就实现了链式调用
        const res = resolveCallback(this.data)
        if (res instanceof selfPromise) {
          res.then(resolve, reject)
        } else {
          // 假如返回的是普通值，则通过resolve传递
          resolve(res)
        }
      })
      this.rejectTask.push(() => {
        const res = rejectCallback(this.error)
        if (res instanceof Promise) {
          res.then(resolve, reject)
        } else {
          reject(res)
        }
      })
    })
  }
}

new selfPromise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 500);
})
  .then((res) => {
    console.log(res);
    return new selfPromise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, 1000);
    });
  })
  .then((data) => {
    console.log(data);
  });
