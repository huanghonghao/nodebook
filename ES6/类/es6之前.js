// es5 中的类
function User(name, age) {
    this.name = name;
    this.age = age;
}

User.prototype.getUserInfo = function() {
    console.log(this.name, this.age);
};

var user = new User('zhangsan', 25);
user.getUserInfo();

let dog1 = { name: '小煤球' };

let obj = {name: 'xxx'};
Object.setPrototypeOf(dog1, obj);

let dog2 = {
    __proto__: obj
};

console.log(dog1.__proto__.name);
console.log(dog2.__proto__.name);
