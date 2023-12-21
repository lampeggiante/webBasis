class privatePromise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.error = undefined
    this.resolvedTasks = []
    this.rejectedTasks = []
    let resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fullfilled'
        this.value = value
        this.resolvedTasks.forEach(task => task())
      }
    }
    let reject = (error) => {
      // 只有在等待态的时候可以转换
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.error = error
        this.rejectedTasks.forEach(task => task())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(OnFullfilled, onRejected) {
    OnFullfilled = typeof OnFullfilled === 'function' ? OnFullfilled : (value) => value
    onRejected = typeof onRejected === 'function' ? onRejected : (error) => { throw error }

    let promise2 = new privatePromise((resolve, reject) => {
      if (this.state === 'fullfilled') {
        setTimeout(() => {
          try {
            let x = OnFullfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.error)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.state === 'pending') {
        this.resolvedTasks.push(() => {
          setTimeout(() => {
            try {
              let x = OnFullfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(e)
            }
          })
        })
        this.rejectedTasks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.error)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })

    return promise2
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 防止循环引用
  if (promise2 === x) {
    return reject(new TypeError('循环引用'))
  }
  let called
  // 只有为函数或对象的时候可以调用
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then
      // 判断then 是否是函数
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          (error) => {
            if (called) return
            called = true
            reject(error)
          }
        )
      } else {
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    // 如果不是函数或对象，直接返回
    resolve(x)
  }
}

//race方法 
privatePromise.race = function(promises){
  return new Promise((resolve,reject)=>{
    for(let i=0;i<promises.length;i++){
      promises[i].then(resolve,reject)
    };
  })
}

// resolve 方法
privatePromise.resolve = function (value) {
  return new privatePromise((resolve, reject) => {
    resolve(value)
  })
}

// reject 方法
privatePromise.reject = function (value) {
  return new privatePromise((resolve, reject) => {
    reject(value)
  })
}

privatePromise.all = function (promises) {
  let arr = []
  let i = 0
  function processData(index, data) {
    arr[index] = data
    i++
    if (i == promises.length) {
      resolve(arr)
    }
  }
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(data => {
        processData(i, data)
      }, reject)
    }
  })
}

// 测试用例 1
new privatePromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 500)
})
  .then((res) => {
    console.log(res)
    return new privatePromise((resolve) => {
      setTimeout(() => {
        resolve(2)
      }, 1000)
    })
  })
  .then((data) => {
    console.log(data)
  })
