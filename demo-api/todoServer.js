const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose')
//const MongoClient = require('mongodb').MongoClient;
const app = express();
const bodyParser = require('body-parser');
//对body-parser进行配置
app.use( bodyParser.urlencoded({extended: true}) )
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' , credentials : true}));
const url ='mongodb://localhost:27017/mydb'
const dbName = 'mydb';
let Schema       = mongoose.Schema;

var TodoSchema   = new Schema({
    text: String,
    completed:Boolean
});

Todo = mongoose.model('Todo', TodoSchema);
// const client =  mongoose(url,{ useNewUrlParser: true });
mongoose.connect(url,{ useNewUrlParser: true });
let dbconnect= mongoose.connection;
dbconnect.on('error', console.error.bind(console, 'connection error:'));

dbconnect.once('open', function() {
  console.log("DB connection alive");
});
// Use connect method to connect to the Server
  app.listen(process.env.PORT || 3004, () => {
    console.log('listening on 3004')
  })



app.get("/todos", (req, res) => {
    Todo.find((err,result)=>{
        if(err){
            console.log(err,"can't get todos")
        }
        else{
            console.log(result,"result")
            res.json(result);
        }
    })
  
});


app.get('/todos/:id',(req,res)=>{
    console.log(req.params,"result")
    // db.collection('todos').find({"_id":req.params._id}).toArray((err,result)=>{
        Todo.findById.findById({_id:req.params.id},(err,result)=>{
        if(err){
            console.log(err,"can't get todos");
        }
        else{
            console.log(result,"result")
            res.json(result[0]);
    }
})
})

app.post('/todos/',(req,res)=>{
    let todo = new Todo(req.body)
    console.log(req.body,"req.body")
    todo.save((err)=>{
        if(err){
            console.log(err,"can't post req.body");
        }
        else{
            res.json(todo)
        }
    })
})


app.delete('/todos/:id',(req,res)=>{
    
    Todo.deleteOne({_id:req.params.id},(err,result)=>{
        if(err){
            console.log(err,ObjectId(req.params._id),"can't post req.body");
        }
        else{
            console.log(result);
            res.json(result)
        
        }
    })
})

app.put('/todos/:id',(req,res)=>{
    console.log(req.params.id,"enter put")
    Todo.findById({_id:req.params.id},(err,result)=>{
        console.log(result,"result is put")
        let newResult = result;
        newResult.completed=!result.completed;
        let todo = new Todo(newResult);
        todo.save((err)=>{
             if (err)  res.send(err);
             
                res.json({ message: 'completed updated!' })
             
            });
    })
})

// curl -X PUT -H "Content-Type: application/json" -d '{"completed":true}' "http://127.0.0.1:3004/todos/5d7c862b3ce7a42b36c7baa9"
//curl http://localhost:3004/todos

//   curl -X DELETE "http://localhost:3004/todos/5d7bc3568873402670c5a960"

// curl -X POST -H "Content-Type: application/json" -d '{"text": "hello 33333", "completed":false}' "http://127.0.0.1:3004/todos"