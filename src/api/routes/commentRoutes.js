var router = require('express').Router();

router.get("/", (req, res, next) => {
    res.send('Get All Comments!');
});

router.get("/:id", (req, res, next) => {
    const commentId = req.params.id;
    const comment = {
        id: commentId,
        desc: "you are awesome"
    }
    res.json(comment);
});

router.put("/:id", (req, res, next) => {
    const commentId = req.params.id;
    const comment = {
        id: commentId,
        desc: "you have been changed"
    }
    res.json(comment);
});

router.post("/", (req, res, next) => {
    res.json({
        id: 1
    });
});

module.exports = router;


//最新函数中的this
p = {
    age1: 10,
    age2: 12,
    say: function () {
        setTimeout(() => console.log("Tradition function this is", this))
    },
    sayArrow: () => console.log("Arrow function this is", this),

    Es6Say() { setTimeout(() => console.log("Es6 function this is", this)) }
}
p.say();
p.sayArrow();
p.Es6Say();

//bind方法
Function.prototype._bind = function (target) {
    //target refers to the this value of the new function
    // this is the fun
    // use close packet,create a function,return the new function
    return () => {
        this.call(target);
    }
}

function fn() {
    console.log(this);
}
var _fn = fn.bind({ age: 18 })
//promise
function fn() {
    return new Promise((resolve, reject) => {
        setTimeout(() = {
            console.log('hello');
            resolve();
        }, 1000);
    })
}

fn(), then(res => {
    console.log("next step");
    fn().then(res => {
        console.log("the second step")
    })
})

//how to solve callback hell;

function f1() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('firststep');
            resolve();
        }, 1000)
    })
}
function f2() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('secondtstep');
            resolve();
        }, 1000)
    })
}

f1().then(res => {
    return f2();
}).then(res => {
    setTimeout(() => {
        console.log("complete")
    }, 4000)
})

// Object.assign

var source = { age: 18, height: 180 }
var nweObj = Object.assign({}, source);
//对象扩展运算符
var obj 