// 1. Symbol值通过Symbol()函数产生
const sym1 = Symbol();
const sym2 = Symbol();
console.log(sym1 === sym2); // false

// 2. 可以Symbol(description)，在产生Symbol时带上描述符，方便调试
let desSym = Symbol('我是一个Sym1');
console.log(desSym); // Symbol(我是一个Sym1) -> 在打印Symbol时会打印出其描述符，标志是哪个Symbol,这就叫"方便调试"
let desSym2 = Symbol('我是一个Sym1');
console.log(desSym === desSym2); // false -> 描述符相同不代表Symbol相同

// 防止对象属性名冲突
//  用例1：用对象表示一个人的跑步时间，如果对象中原本有跑步的时长这一属性，想要加入跑步的开始时间的新属性，如果是字符串，很可能都会是time值，原值被覆盖
//  a. 防止覆盖掉以前的：原属性中已有time做键名，新增属性用Symbol做键名，
const obj = {
  time: 20,
};
const timeSym = Symbol('time');
obj[timeSym] = '11:30';
console.log(obj); // { time: 20, [Symbol(time)]: '11:30' }
//     比如：手写call方法
Function.prototype._call = function (context, ...args) {
  if (context === undefined || context === null) {
    context = window;
  }
  // 2. 原this就是原函数，要将原this变成context的方法，为防止覆盖context的属性，用Symbol一定不会重复
  let fn = Symbol();
  context[fn] = this;
  // 3. 执行函数，将函数执行结果返回
  let res = context[fn](...args);
  // 4. 执行完记得删除这个方法
  delete context[fn];
  return res;
};

// b. 防止被后来的覆盖：原属性中Symbol做键名，新增属性用time做键名
const obj2 = {
  [Symbol('time')]: 20,
};
obj2.time = '11:30';
console.log(obj2); //{ time: '11:30', [Symbol(time)]: 20 }
// 真实用例：内置的Symbol值：ES6规范设计者为了防止用户覆盖语言内部使用的方法，内置了11个Symbol值，指向这些方法，最常见的就是
// Symbol.iterator属性，指向对象的默认遍历器方法，用for of循环就会调用此方法

// ----------------------------------------------------------------
// 消除魔术字符串
// 比如我的日历demo中需要用一个变量来保存日历的状态
// 原来的消除方法，存成变量
const STATUS = {
  day: 'day',
  year: 'year',
  month: 'month',
};
let curStatus = STATUS.day;
// 然后通过判断curStatus值是什么来决定做什么事情。

// 会发现其实值是啥根本就是不关心的，只要与其他的能够区分就行了，因此可以写成
const STATUS2 = {
  day: Symbol(),
  year: Symbol(),
  month: Symbol(),
};

//-------------------------------------------------------------------
// 实现私有变量
const obj3 = {
  [Symbol('test')]: 'private',
};
console.log(obj[Symbol('test')]); // undefined

// 1. 外层不知道键名时根本不可能获取到该变量
// 2. 获取到该键名只有通过较新的 Object.getOwnPropertySymbols() 和 Reflect.OwnKeys()去获取，其他老一点的遍历方法
// 为了兼容老代码，是不能获取到Symbol值的

// 不过有时候还是有需要通过描述符就能获取某个Symbol值的需求，就可以用
const sym4 = Symbol.for('test'); // 不管在哪个作用域生成了这个Symbol值，都会注册到全局环境中，如果全局环境没查到，才会生成新的，否则返回查询到的
const sym5 = Symbol.for('test');
console.log(sym4 === sym5); // true

const sym6 = Symbol.keyFor(sym5); // 根据symbol在注册表中查询，返回其key，若未查到，返回undefined
