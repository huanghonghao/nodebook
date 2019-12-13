let btns=document.querySelectorAll("button");
btns.forEach(function(item){
    //外层循环为每个按钮注册点击事件
    item.onclick=function(){
        //内层循环修改按钮的值
        for(let i=0;i<btns.length;i++){
            btns[i].innerText="没被点"; //--排他，先干掉全部
        }
        this.innerText="被点了";//，最后保全自己
    }
});



//=============闭包============
var item =document.querySelectorAll('li');

// 以前存在的问题
// for (var i=0;i<item.length;i++){
//     item[i].onclick=function(){
//         console.log(i);
//     }
// }

// 使用闭包防止变量提升的问题
// for (var i=0;i<item.length;i++){
//     var temp=function(j){
//         item[j].onclick=function(){
//             console.log(j);
//         }
//     };
//     temp(i)
// }

// 使用ed6 中的let
for (let i=0;i<item.length;i++){
    item[i].onclick=function(){
        console.log(i);
    }
}


// function f1(){
//
//     var n=999;
//
//     function f2(){
//         console.log('out', n);
//     }
//
//     return f2;
//
// }
//
// f1();
