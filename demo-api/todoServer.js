const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const MongoClient = require('mongodb').MongoClient;
const app = express();
const bodyParser = require('body-parser');
//对body-parser进行配置
app.use( bodyParser.urlencoded({extended: true}) )
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' , credentials : true}));
const url ='mongodb://localhost:27017/'
const dbName = 'mydb';
let db ;

const client = new MongoClient(url,{ useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function(err) {
  console.log("Connected successfully to server");

  db = client.db(dbName);
  app.listen(process.env.PORT || 3004, () => {
    console.log('listening on 3004')
  })

});


app.get("/todos", (req, res) => {
    db.collection('todos').find().toArray((err,result)=>{
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
    // db.collection('todos').find({"_id":req.params.id}).toArray((err,result)=>{
    db.collection('todos').find({"_id": ObjectId(req.params.id)}).toArray((err,result)=>{
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
    db.collection('todos').insertOne(req.body,(err,result)=>{
        if(err){
            console.log(err,"can't post req.body");
        }
        else{
            res.json(result)
        }
    })
})


app.delete('/todos/:id',(req,res)=>{
    db.collection('todos').findOneAndDelete({"_id": ObjectId(req.params.id)},(err,result)=>{
        if(err){
            console.log(err,"can't post req.body");
        }
        else{
            res.json('A darth vadar quote got deleted')
        }
    })
})

app.put('/todos/:id',(req,res)=>{
    db.collection('todos').findOneAndUpdate({"_id":ObjectId(req.params.id)},{$set:{completed:!req.completed}},{
        sort: {
            _id: -1
        },
        upsert: true
    }, (err, result) => {
        if (err) return res.send(err)
        res.json(result)
    })
})

// curl -X PUT -H "Content-Type: application/json" -d '{"completed":false}' "http://127.0.0.1:3004/todos/5d72598c1ab2884aee121fa3"
