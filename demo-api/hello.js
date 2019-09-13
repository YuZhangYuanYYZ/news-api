const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//对body-parser进行配置
app.use( bodyParser.urlencoded({extended: true}) )
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('示例应用正在监听 3000 端口!');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.delete('/users/:id', (req, res) => {
     const params = req.params;
     const numberId = Number(params.id);
    console.log(numberId);
    const body = `delete hello ${numberId}`
    res.status(200).send(body)
  });
  
app.get('/users/:id',(req,res)=>{
    console.log("enter")
    const params = req.params;
    const numberId = Number(params.id);
    const body = {"result": [1,2,numberId]};
    res.status(200).send(body)
});
app.put('/users/:id',(req,res)=>{

    const params = req.params;
    const numberId = Number(params.id);
    const body = req.body;
    res.status(200).send(body)
});

