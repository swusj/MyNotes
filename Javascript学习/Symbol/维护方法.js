// 保存的目的就是为了取用，其实Symbol.for也相当于提供了个保存的功能，但由于其是注册在全局环境中的，相当于是全局环境中都能取到，不太适合某些不想其他作用域获取到的情况。
// 因此，可以实现一个注册表的类，用变量来存注册表实例，灵活控制其作用域
class mySymbol {
  constructor() {
    // 用数组、对象存储都可以。。
    // 这里就维护一个形如 [[key,symbol],[key,symbol],...,[key,symbol]] 的注册表
    this.SymbolList = [];
  }
  // 增加symbol
  add(key) {
    if (this.SymbolList.findIndex((item) => item[0] === key) >= 0) {
      console.log('该key值对应的Symbol已存在');
      return this.SymbolList;
    } else {
      this.SymbolList.push([key, Symbol(key)]);
      return this.SymbolList;
    }
  }
  //根据key删除symbol、或者根据symbol删除，这里暂时只写根据key
  delete(key) {
    let index = this.SymbolList.findIndex((item) => item[0] === key);
    if (index >= 0) {
      this.SymbolList = [...this.SymbolList.slice(0, index), ...this.SymbolList.slice(index + 1, this.SymbolList.length)];
      return this.SymbolList;
    } else {
      console.log('该key值对应的Symbol不存在');
      return this.SymbolList;
    }
  }
  // 根据key值获取symbol
  get(key) {
    let index = this.SymbolList.findIndex((item) => item[0] === key);
    if (index >= 0) {
      return this.SymbolList[index][1];
    } else {
      return undefined;
    }
  }

  // 根据Symbol获取key值
  myKeyFor(symValue) {
    let index = this.SymbolList.findIndex((item) => item[1] === symValue);
    if (index >= 0) {
      return this.SymbolList[index][0];
    } else {
      return undefined;
    }
  }
  getSymbolList() {
    return this.SymbolList;
  }
}

let mySym = new mySymbol();

mySym.add('aa');
let test = mySym.get('aa');
console.log(test);
console.log(mySym.myKeyFor(test));
mySym.delete('aa');
console.log(mySym.get('aa'));
