const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//对body-parser进行配置
app.use( bodyParser.urlencoded({extended: true}) )
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('示例应用正在监听 3000 端口!');
});
let todos=[
    {
      "id": 1,
      "text": "hello todos 1",
      "completed": false
    },
    {
      "id": 2,
      "text": "hello todos 2",
      "completed": false
    },
    {
      "id": 3,
      "text": "hello todos 3",
      "completed": false
    }
  ]

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.get("/todos/:id",(req,res)=>{
    const numberId =Number(req.params.id);
    res.send(todos[numberId]);
})

app.delete("/todos/:id",(req,res)=>{
    const numberId1 = Number(req.params.id);
    todos=todos.filter((todo)=>todo.id!==numberId1);
    res.send({});
})

app.put("/todos/:id",(req,res)=>{
    const numberId1 = Number(req.params.id);
    const reqTodo = req.body;
    todos=todos.map((todo)=>{
        if(todo.id==numberId1){
            todo = reqTodo;
        };
        return todo;
    })
    const resTodo = todos.find(todo=>todo.id===numberId1)
    if(resTodo===[]){
        res.status(404).send('出错了！');
    }
    else{
        res.send(resTodo);

    }
})



