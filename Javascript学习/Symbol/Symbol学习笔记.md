# Symbol 学习笔记

## 一、Symbol 特性

Symbol 是 ES6 新加入的一种原始数据类型，表示独一无二的值。通过 Symbol()函数产生。

```javascript
// 1. Symbol值通过Symbol()函数产生
const sym1 = Symbol();
const sym2 = Symbol();
console.log(sym1 === sym2); // false

// 2. 可以Symbol(description)，在产生Symbol时带上描述符，方便调试
let desSym = Symbol('我是一个Sym1');
console.log(desSym); // Symbol(我是一个Sym1) -> 在打印Symbol时会打印出其描述符，标志是哪个Symbol,这就叫"方便调试"
let desSym2 = Symbol('我是一个Sym1');
console.log(desSym === desSym2); // false -> 描述符相同不代表Symbol相同
```

## 二、产生的意义

### 1. 阻止对象属性名冲突（主要意义）

##### 2.1 防止覆盖原属性

在 Symbol 出现前，只能用字符串作为对象的键名，如果开发者想要对一个不知道有哪些属性的对象进行扩展，由于字符串不具有独一无二的特性，用字符串做键名很可能会覆盖掉对象的原属性；而 Symbol 出现后，由于其独一无二的特性，用其做键名肯定不会覆盖掉对象的原属性。

```javascript
//  用例：用对象表示一个人的跑步时间，如果对象中原本有跑步的时长这一属性，想要加入跑步的开始时间的新属性，如果是字符串，很可能都会是time值，原值被覆盖
//  a. 防止覆盖掉以前的：原属性中已有time做键名，新增属性用Symbol做键名，
const obj = {
  time: 20,
};
const timeSym = Symbol('time');
obj[timeSym] = '11:30';
console.log(obj); // { time: 20, [Symbol(time)]: '11:30' }
//比如：手写call方法

Function.prototype._call = function (context, ...args) {
  if (context === undefined || context === null) {
    context = window;
  }
  // 原this就是原函数，要将原this变成context的方法，为防止覆盖context的属性，用Symbol一定不会重复
  let fn = Symbol();
  context[fn] = this;
  // 执行函数，将函数执行结果返回
  let res = context[fn](...args);
  // 执行完记得删除这个方法
  delete context[fn];
  return res;
};
```

##### 2.2 防止属性被后来属性覆盖

```javascript
// b. 防止被后来的覆盖：原属性中Symbol做键名，新增属性用time做键名
const obj2 = {
  [Symbol('time')]: 20,
};
obj2.time = '11:30';
console.log(obj2); //{ time: '11:30', [Symbol(time)]: 20 }
```

真实用例：内置的 Symbol 值：ES6 规范设计者为了防止用户覆盖语言内部使用的方法，内置了 11 个 Symbol 值，指向这些方法，最常见的就是 Symbol.iterator 属性，指向对象的默认遍历器方法，用 for of 循环就会调用此方法

### 2. 其他用法

##### 2.1 消除魔术字符串

比如我的日历 demo 中需要用一个变量来保存日历的状态。

原来的消除方法，存成变量：

```javascript
const STATUS = {
  day: 'day',
  year: 'year',
  month: 'month',
};
let curStatus = STATUS.day;
// 然后通过判断curStatus值是什么来决定做什么事情。
```

会发现其实值是啥根本就是不关心的，只要与其他的能够区分就行了，因此可以写成

```javascript
const STATUS2 = {
  day: Symbol(),
  year: Symbol(),
  month: Symbol(),
};
```

##### 2.2 模拟私有变量

```javascript
const obj3 = {
  [Symbol('test')]: 'private',
};
console.log(obj[Symbol('test')]); // undefined
```

1. 外层不知道键名时根本不可能获取到该变量

2. 获取到该键名只有通过较新的 Object.getOwnPropertySymbols() 和 Reflect.OwnKeys()去获取，其他老一点的遍历方法为了兼容老代码，是不能获取到 Symbol 值的

### 3. Symbol.for()和 Symbol.keyFor()

有时候还是有需要通过描述符就能获取某个 Symbol 值的需求，就可以用 Symbol.for()

```
const sym4 = Symbol.for("test"); // 不管在哪个作用域生成了这个Symbol值，都会注册到全局环境中，如果全局环境没查到，才会生成新的，否则返回查询到的
const sym5 = Symbol.for("test");
console.log(sym4 === sym5); // true
```

Symbol.keyFor() 根据 symbol 在注册表中查询，返回其 key，若未查到，返回 undefined
