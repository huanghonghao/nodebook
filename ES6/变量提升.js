console.log(v1);
var v1 = 100;
function foo() {
    console.log(v1);
    var v1 = 200;
    console.log(v1);
}
foo();
console.log(v1);


//函数声明式
function bar () {}
//函数字面量式
var foo = function () {};

/**
 所有的声明都会提升到作用域的最顶上去。

 同一个变量只会声明一次，其他的会被忽略掉或者覆盖掉。

 函数声明的优先级高于变量申明的优先级，并且函数声明和函数定义的部分一起被提升。
 */
console.log(bar);
var bar = function() {
    console.log(1);
}
//undefined

//=============================
console.log(bar);
function bar() {
    console.log(1);
}
//输出结果
//function bar() {
// console.log(1);
//}

//=================
foo(); //1

var foo;

function foo () {
    console.log(1);
}

foo = function () {
    console.log(2);
}
foo(); //2
