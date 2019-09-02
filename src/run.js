
const AddSomeThing = require('./callbackFunctionPratice');

const init = () => 10;

const result = AddSomeThing({ first: 1, second: 2, third: 3, fourth: 4 }, (array) => {
    const result = array.reduce((accumulateValue, currentValue) => {
        return accumulateValue + currentValue;
    }, 0);

    return result + init();
});

console.log(result);


AddSomeThing1({ first: 1, second: 2, third: 3, fourth: 4 });
function jQuery() {
    var _init = jQuery.prototype.init;
    //_init就是一个构造函数
    return new _init();
}
jQuery.prototype = {
    constructor: jQuery,
    length: 100,
    init: function () {
        //this可以访问到实例本身的属性，也可以访问到init.prototype中的属性
        //这里的init.prototype并不是jQuery.prototype
        console.log(this.length);
        //正确答案：undefined
        //100? 错误的
    }
}

function q() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("hello");
        }, 1000)
    })
}

var O1 = {
    say: async () => {
        console.log("I'm say")
        let a = await q();
        console.log(a);
    },
    run: async () => {
        console.log("I'm run")
        let b = await q();
        console.log(b);
    },
}
    (async function () { await O1.say(); await O1.run(); })();