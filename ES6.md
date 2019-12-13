[TOC]

### 一、ECMAScript 6简介

ECMAScript 6.0，简称ES6，第一个版本是在2015年6月进行发布，所以也称之为《ECMAScript 2015 标准》（简称 ES2015）。

JavaScript是ECMAScript的一种实现（分支），遵循ECMAScript标准的。目前主流浏览器已经可以完美兼容和使用ES6。ES7/8部分新特性也已经被用于我们的实际开发中。

本篇主要讲解ES6的知识点，内容如下：let和const、解构赋值、字符串操作、函数、数组API、集合、对象拷贝、延展操作符、对象补充、Generator、Proxy、Reflect。

### 二、let和const

ES6新增了let和const来声明变量，主要是解决var声明变量所造成的困扰和问题：

> var不能用于定义常量
>
> var可以重复声明变量
>
> var存在变量提升
>
> var不支持块级作用域

而let和const解决了以上问题，具体操作如下：

**1）不可以重复声明变量**

```jsx
let site = 'itLike';

let site = 'itLike'; 

console.log(site);
```

运行结果:

```
Identifier 'site' has already been declared
```

**2）不存在变量提升**

```jsx
console.log(site);

let site = 'itLike';
```

运行结果：

```
site is not defined
```

**3）可以定义常量**

不能给常量重新赋值，但如果是引用类型的话可以进行修改。

```cpp
// 自然对数的底

const E = 2.718;

E = 2.71; 

console.log(E);
```

运行结果:

```
Assignment to constant variable.
//  引用类型
const LK = {

   name:'itLike', 

   intro: '喜欢IT, 就上撩课(itLike.com)'

};

LK.name = '撩课';
console.log(LK);
```

运行结果:



![img](https:////upload-images.jianshu.io/upload_images/7771302-3679dfdfbc8dbc6b?imageMogr2/auto-orient/strip|imageView2/2/w/602/format/webp)

image

**4)  块级作用域**

如果用var定义变量，变量是通过函数或者闭包拥有作用域；但，现在用let定义变量，不仅仅可以通过函数/闭包隔离，还可以通过块级作用域隔离。

块级作用域用一组大括号定义一个块，使用 let 定义的变量在大括号的外部是访问不到的，此外，let声明的变量不会污染全局作用域。

```jsx
{let site = 'itLike';}

console.log(site);
```

运行结果:

```
site is not defined
if(1){  let str = '小撩'; }

console.log(str);
```

运行结果:

```
str is not defined
```



### 三、解构赋值

用于分解js中对象的结构。

**1） 用于数组的结构**

```jsx
//  普通写法

let nameArr = ['撩课', '小撩', '小煤球'];

let name1 = nameArr[0];

let name2 = nameArr[1];

let name3 = nameArr[2];

//  解构写法

let [name1, name2, name3] = nameArr;

console.log(name1, name2, name3);
```

**2）对象的解构**

```jsx
//  写法1

let {name, age, sex} = {name: '小煤球', age: 1, sex: '公'};

// 结果: 小煤球 1 公

console.log(name, age, sex);

//  写法2： 解构重命名

let {name: lkName, age: lkAge, sex: lkSex} = {name: '小煤球', age: 1, sex: '公'};

// 结果: 小煤球 1 公

console.log(lkName, lkAge, lkSex);  

//  写法3： 可以设置默认值

let {name, age, sex = '公'} = {name: '小煤球', age: 1};

console.log(sex);  // 公

//  写法4：省略解构

let [, , sex] = ['小煤球', 1, '公 '];

console.log(sex);
```

**3） 应用场景**

在封装ajax的GET和POST请求时, 就可以运用到解构的知识点，代码如下：



![img](https:////upload-images.jianshu.io/upload_images/7771302-74cf3c9ccf09fcf7?imageMogr2/auto-orient/strip|imageView2/2/w/713/format/webp)

image

### 四、延展操作符

**1）延展数组**

```bash
 let arr1 = [ 'a', 'b', 'c'];
 let arr2 = [1, 2, 3];
 let result = [...arr1, ...arr2];
 console.log(result); 
  //  [ "a", "b", "c", 1, 2, 3 ]
```

**2）延展对象**

```jsx
 let smallDog = {name:'小煤球', age: 1};
 let bigDog = {name: 'Python', age: 2};
 let dog = {...smallDog, ...bigDog};
 console.log(dog);  
 // {name: "Python", age: 2}
```

注意:  如果对象中的属性一致, 会被覆盖

**3）开发应用场景**

```jsx
 function getMinValue() {
      console.log(Math.min(...arguments));
 }
```

> getMinValue(1, -99, 22, 10, 9);   //  -99

### 五、字符串操作

**新增字符串方法**

1. startsWith()

判断字符串是否以 XX 开头

```jsx
let url = 'http://www.itlike.com';

console.log(url.startsWith('http'));  // true
```

1. endsWith()

判断字符串是否以 XX 结尾

```jsx
let file = 'index.html';

console.log(file.endsWith('html'));  // true
```

1. includes

判断字符串中是否包含 XX

```rust
let str = 'liaoke';

console.log(str.includes('ao')); // true
```

1. repeat()

拷贝n份

```jsx
let title = '撩课在线';

console.log(title.repeat(100));
```

**5) padStart() / padEnd()**

padStart()用于头部补全，

padEnd()用于尾部补全;

第一个参数用来指定字符串的最小长度，

第二个参数是用来补全的字符串。

```jsx
//  "2030111111"

let y1 = '2030'.padEnd(10, '1'); 

//   "2030-11-22"

let y2 = '11-22'.padStart(10, '2030-MM-DD');  

console.log(y1, y2);
```

**模板字符串**

**1)  模板字符串**

模板字符串用反引号(`)包含，变量用${}括起来; 在开发中使用是非常灵活的。

```jsx
 let name = '小煤球';
 let sex = '公';
 let result = `我叫 ${name} , 我是 ${sex} 的`;
 console.log(result); 
 // 我叫 小煤球 , 我是 公 的
```

**2) 模板字符串遍历插入**



![img](https:////upload-images.jianshu.io/upload_images/7771302-8d89ddf55fc67563?imageMogr2/auto-orient/strip|imageView2/2/w/764/format/webp)

image

**3) 模板字符串实现原理**

```jsx
 let name = '小煤球'; 
 let sex = '公';
 
 let result = `我叫 ${name} , 我是 ${sex} 的`;
 
 result = result.replace(/\${([^}]*)}/g);
 console.log(result);
```

### 六、函数操作

**1） 设置默认参数**

以前

```jsx
function (height, color, url) {
    var height = height || 50
    var color = color || 'red'
    var url = url || 'http://azat.co'
    ...
}
```

现在

```jsx
 function logPerson(name, sex = '男', age = 20) {
 
    console.log(name);
 
    console.log(sex);
 
     console.log(age);
 
 }
 
 //  undefined 男 20
 
 logPerson();
```

**2）延展参数转化**

```jsx
 let logName = function (arg1, ...arg2) {
 
     console.log(arg1, arg2);
 
 };
 
 // 宋小宝 , ["赵薇", "王菲", "那英"]
 logName('宋小宝', '赵薇', '王菲', '那英');
```

**3）箭头函数**

箭头函数简化了函数的的定义方式;

一般以 "=>" 操作符左边为输入的参数;

而右边则是进行的操作以及返回的值 inputs => output。

```jsx
 ["赵薇", "王菲", "那英"].forEach(
       val => console.log(val) 
 );
```

**注意： **

1）多个参数要用()包起来，函数体有多条语句需要用{}包起来；

2）箭头函数根本没有自己的this，所以内部的this就是外层代码块的this。 正是因为它没有this，从而避免了this指向的问题；

* **小知识**

> **一、普通函数中this**
>
> （1）总是代表着它的直接调用者，如obj.fn，fn里的最外层this就是指向obj
>
> （2）默认情况下，没有直接调用者，this指向window
>
> （3）严格模式下（设置了'use strict'），this为undefined
>
> （4）当使用call，apply，bind（ES5新增, 会创建一个新函数）绑定的，this指向绑定对象
>
> **二、ES6中箭头函数的this**
>
> （1）默认指向定义它时，所处上下文的对象的this指向。即ES6箭头函数里this的指向就是上下文里对象this指向，偶尔没有上下文对象，this就指向window
>
> （2）即使是call，apply，bind等方法也不能改变箭头函数this的指向



3）箭头函数中没有arguments对象。



![img](https:////upload-images.jianshu.io/upload_images/7771302-0250133886e2355d?imageMogr2/auto-orient/strip|imageView2/2/w/788/format/webp)

image

**注意：**

1）let声明的变量不会放在window上

2）对象不是作用域

```jsx
 let site = 'like.com';
 
 let obj = {
     site: '撩课',
     func: () => {
         //  this指向window
         console.log(this);
         // undefined
         console.log(this.site);
     }
 };
 let func = obj.func;
  func();
```

### 七、数组新增方法

ES6中在原有数组的方法上又新增了一些好用的方法，比如：forEach、findIndex、find、map、reduce、filter、every、some等。

**1）Array.from()**

将一个数组或者类数组变成新数组，是浅拷贝操作。

```jsx
 let oldArr = [
 
      '小煤球', 10, 
 
      {df1: '小Python',  df2: '土豆'}
 
 ];
 
 let newArr = Array.from(oldArr);
 
 console.log(newArr === oldArr); // false
```

**2）Array.of()**

创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。

```jsx
 // [8]
 console.log(Array.of(8));
 // [1, 2, 3]
 console.log(Array.of(1, 2, 3));
 // [ , , , , , , ]
 console.log(Array(8));
 // [1, 2, 3]
  console.log(Array(1, 2, 3));
```

**3）Array.fill()**

用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。

语法结构：arr.fill(value[, start[, end]])

```jsx
 let array1 = [1, 2, 3, 4, 5];
 
 // 用 撩 替换 索引[2,5]中的内容
 console.log(array1.fill('撩', 2, 5));
 
 // 用 撩 替换 索引[1]中的内容
 console.log(array1.fill('撩', 1));
 
 // 用 撩 替换 数组中所有内容
  console.log(array1.fill('撩'));
```

运行结果：



![img](https:////upload-images.jianshu.io/upload_images/7771302-4ffc54aa548d3ede?imageMogr2/auto-orient/strip|imageView2/2/w/392/format/webp)

image

### 八、对象操作

**8.1 属性简写**

如果对象中属性值和变量名一样，并且属性的值就是变量表示值，则简写。



![img](https:////upload-images.jianshu.io/upload_images/7771302-86116966b674a2ef?imageMogr2/auto-orient/strip|imageView2/2/w/955/format/webp)

image

**8.2  super**

通过super可以调用prototype上的属性或方法。



![img](https:////upload-images.jianshu.io/upload_images/7771302-366adeb923b20d16?imageMogr2/auto-orient/strip|imageView2/2/w/656/format/webp)

image

**8.3  Object.is**

对比两个值是否相等

```jsx
 console.log(Object.is(Array, Object));
```

**8.4  Object.setPrototypeOf**

将一个指定的对象的原型设置为另一个对象或者null

```jsx
 let dog1 = { name: '小煤球' };
 
 let obj = {name: 'xxx'}; 
Object.setPrototypeOf(dog1, obj);
 
 let dog2 = {
      __proto__: obj 
 };
 
 console.log(dog1.__proto__.name);
  console.log(dog2.__proto__.name);
```

**8.5 对象拷贝-深拷贝和浅拷贝**

**1）浅拷贝**

> Object.assign拷贝

```jsx
 let obj1 = { dog1: { name: '小煤球' } };
 
 let obj2 = { name: '小Python' };
 let obj = {};

 Object.assign(obj, obj1, obj2);
  console.log(obj);
```

> 延展拷贝

```jsx
let obj1 = { dog1: { name: '小煤球' } };
let obj2 = { name: '小Python' };
console.log({ ...obj1, ...obj2 });
```

**2）深拷贝**

> JSON.parse和JSON.stringify

```jsx
let obj1 = { dog1: { name: '小煤球' } };

let obj2 = { name: '小Python' };

console.log(JSON.parse(JSON.stringify({ ...obj1, ...obj2 })));
```

> 递归调用实现



![img](https:////upload-images.jianshu.io/upload_images/7771302-b4e77f1db1452d09?imageMogr2/auto-orient/strip|imageView2/2/w/1080/format/webp)

image

### 九、类操作

在之前定义类是通过构造函数来操作的，es6新增了class关键字，此时，我们也可以像其它语言一样来创建各种类了。

```kotlin
 class Person{
     constructor(name, age){
         this.name = name;
         this.age = age;
     }
     print(){
         console.log('我叫' + this.name + ',今年' + this.age + '岁');
     }
  }
```

**类的继承**

小案例：五彩小球

运行效果：



![img](https:////upload-images.jianshu.io/upload_images/7771302-1f87b19b2fb18297?imageMogr2/auto-orient/strip|imageView2/2/w/1080/format/webp)

image

核心代码：



![img](https:////upload-images.jianshu.io/upload_images/7771302-23fe0e7b4b178892?imageMogr2/auto-orient/strip|imageView2/2/w/752/format/webp)

image



![img](https:////upload-images.jianshu.io/upload_images/7771302-6be39606e6d4e1bd?imageMogr2/auto-orient/strip|imageView2/2/w/711/format/webp)

image

### 十、集合操作

**1）set**

一个Set是一堆东西的集合，Set有点像数组，不过跟数组不一样的是，Set里面不能有重复的内容；

```tsx
 // 创建一个集合 
 let set = new Set(['张三', '李四', '王五', '张三', '李四']);
  console.log(set);
 // 一个属性
  console.log(set.size);
  // 四个方法 
 // add
 console.log(set.add('刘德华').add('旋之华')); 
 console.log(set); 
 // delete 
 console.log(set.delete('张三'));
 console.log(set.delete('李四'));
 console.log(set);
 
 // has
 console.log(set.has('张三'));
 console.log(set.has('张三1'));
 
 // clear
 console.log(set.clear()); // undefined
  console.log(set);
```

**2)  map**

Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。

如果你需要“键值对”的数据结构，Map比Object更合适。

它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

实例属性和方法：size、set、get、has、delete、clear

```go
 // 创建一个Map
 
 let obj1 = {a: 1}, obj2 = {b: 2};

 const  map = new Map([
 
     ['name', '张三'],
 
     ['age', 18],
 
     ['sex', '男'],
 
     [obj1, '今天天气很好'],
 
     [obj2, '适合敲代码'],
 
     [[1,2], 'hhh']
 
 ]);
 
 console.log(map);
 
 console.log(map.size);
 
 // set和get

 map.set('friends', ['赵六', '力气']).set(['dog'], '小花');
 
 console.log(map);
 
 console.log(map.get('name'));
 
 console.log(map.get(obj1));
 
 // delete

 map.delete(obj1);
 
 console.log(map.delete('xxxx'));
 
 console.log(map);
 
 // has
 
 console.log(map.has(obj1));
 
 console.log(map.has(obj2));
 
 // clear
 
 map.clear();
 
 console.log(map);
 
 // 遍历

 map.forEach(function (value, index) {
 
    console.log(index + ':' + value);
 });
 
 // 注意事项
 
 map.set({}, '呵呵呵呵呵');
 
 map.set({}, '哈哈哈哈');
 console.log(map); 
 console.log({} === {});
```

### 十一、Generator

为什么要使用generator?

开发中， 比如在做网络请求时我们会进行异步调用，为了保证调用顺序的正确性，通常我们会用回调函数，也可以采用Promise相关的技术来操作。

还有一种常用的解决方案，它就是Generator生成器函数。

顾名思义，它是一个生成器，它也是一个状态机，内部拥有值及相关的状态，生成器返回一个迭代器Iterator对象，我们可以通过这个迭代器，手动地遍历相关的值、状态，保证正确的执行顺序。

**1）声明**

Generator的声明方式类似一般的函数声明，只是多了个*号，并且一般可以在函数内看到yield关键字。

```ruby
 function* showNames() {
 
     yield '张三'; 
     yield '李四';
 
     return '王五'; 
}
 
 let show = showNames();
 
  // {done: false, value: "张三"}
 
 console.log(show.next());
 
 // {done: false, value: "李四"}
 
 console.log(show.next()); 
 
 // {done: true, value: "王五"}
 
 console.log(show.next()); 
 
 // {done: true, value: undefined}
  console.log(show.next());
```

迭代器有一个next方法，每次执行的时候会返回一个对象，对象里面有两个属性，一个是value表示返回的值，还有就是布尔值done，表示是否迭代完成。

**2）模拟实现**



![img](https:////upload-images.jianshu.io/upload_images/7771302-10f4201b96f6a06c?imageMogr2/auto-orient/strip|imageView2/2/w/762/format/webp)


