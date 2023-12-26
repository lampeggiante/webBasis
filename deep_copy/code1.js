obj = {
  id: '266',
  name: '张三',
  age: 20,
  desc: '聪明的张三'
}

obj_copied = JSON.parse(JSON.stringify(obj))
console.log('deep copy?', obj !== obj_copied)

/* 
  JSON 深拷贝的问题
    1. 如果 obj 中有时间对象，则JSON深拷贝获得的结果中，时间将会变为字符串的形式，而不是时间
    2. 如果对象里面有正则和错误对象，序列化之后得到的结果为空对象
    3. 如果 obj 中有函数，undefined，则序列化的结果会把函数和undefined丢失
    4. 如果 obj 中有 NaN、Infinity、和-Infinity，则序列化的结果会变成null
    5. JSON.stringify()只能序列化对象的可枚举的自有属性，如果obj函数原本有构造函数，在深拷贝之后会丢失constructor
    6. 如果对象中存在循环引用的情况也无法正确实现深拷贝
*/
