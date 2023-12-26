function generatorAsync (genFn) {
  return function () {
    const gen = genFn.apply(this, arguments)
    return new Promise((resolve, reject) => {
      function step (key, arg) {
        let generatorResults
        try {
          // 这里使用中括号属性命名法
          generatorResults = gen[key](arg)
        } catch (e) {
          reject(e)
        }

        const { value, done } = generatorResults
        if (done) {
          return resolve(value)
        } else {
          return Promise.resolve(value).then((val) => step('next', val), (err) => step('throw', err))
        }
      }
      step('next')
    })
  }
}

const getData = () => new Promise((resolve) => setTimeout(() => resolve('data'), 1000));
var test = generatorAsync(function* testG() {
  // await被编译成了yield
  const data = yield getData()
  console.log('data1: ', data)
  const data2 = yield getData()
  console.log('data2: ', data2)
  return 'success'
})
test().then((res) => console.log(res))
