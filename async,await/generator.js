// 参考掘金博客文章 https://juejin.cn/post/6859281096152973326#heading-15
class Context {
  constructor (val) {
    this.next = 0
    this.prev = 0
    this.done = false
    this._send = val
  }
  stop () {
    this.done = done
  }
}

function gen$ (context) {
  let x
  while (true) {
    switch (context.prev = context.next) {
      case 0:
        context.next = 2
        return 'result1'
      case 2:
        x = context._send
        context.next = 4
        return 'result2'
      case 4:
        context.next = 6
        return 'result3'
      case 6:
        context.stop()
        return undefined
    }
  }
}

let foo = function () {
  var context = new Context(222)
  return {
    next: function () {
      let value = gen$(context)
      let done = context.done
      return { value, done }
    }
  }
}

console.log(foo().next())
console.log(foo().next())
console.log(foo().next())
console.log(foo().next())
