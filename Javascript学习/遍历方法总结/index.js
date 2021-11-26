// 这前四个方法，都可以用来遍历对象的【键名】，这非常有用，其中后两个都是es5中新增的方法
//       包含                      原型链       不可枚举    Symbol
// 1. for in                        √
// 2. Object.keys()
// 3. Object.getOwnPropertyNames()              √
// 4. Reflect.ownKeys()                         √          √

// 判断对象是否包含某属性
// 5. obj.hasOwnProperty()                      √          √

// 只遍历对象的symbol属性
// 6. Object.getOwnPropertySymbols()

// Reflect.ownKeys() === Object.getOwnPropertyNames()+Object.getOwnPropertySymbols()

// 例子：
// 父
var myParent = Object.create(Object.prototype, {
  [Symbol.for('爸爸符号属性名')]: {
    value: 'symbol',
    writable: true,
    enumerable: true,
    configurable: true,
  },
  noEnumerableDad: {
    value: '爸爸不可枚举',
    writable: true,
    enumerable: false,
    configurable: true,
  },
  enumerableDad: {
    value: '爸爸可枚举',
    writable: true,
    enumerable: true,
    configurable: true,
  },
});

// 子
var mychild = Object.create(myParent, {
  [Symbol.for('我是儿子符号属性名')]: {
    value: 'symbol',
    writable: true,
    enumerable: true,
    configurable: true,
  },
  noEnumerableChild: {
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true,
  },
  enumerableChild: {
    value: '儿子可枚举',
    writable: true,
    enumerable: true,
    configurable: true,
  },
});

console.log('for in----------------------');
for (let key in mychild) {
  console.log(key);
}

console.log('for of----------------------');
for (let value of mychild) {
  console.log(value);
}

console.log('Object.keys-----------------');
console.log(Object.keys(mychild));

console.log('obj.hasOwnProperty()--------');
console.log(mychild.hasOwnProperty('enumerableDad'));
console.log(mychild.hasOwnProperty(Symbol.for('我是儿子符号属性名')));
console.log(mychild.hasOwnProperty('enumerableChild'));
console.log(mychild.hasOwnProperty('noEnumerableChild'));

console.log('obj.getOwnPropertyNames()----');
console.log(Object.getOwnPropertyNames(mychild));

console.log('Reflect.ownKeys()------------');
console.log(Reflect.ownKeys(mychild));

console.log('Reflect.getOwnPropertySymbols()------------');
console.log(Object.getOwnPropertySymbols(mychild));
