const express = require('express');
const app = express();
const PORT = 3000;
const router = require('./Router/Routers');
var bodyParser = require('body-parser')
var cors = require("cors");

app.use(cors());
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/",router);

app.listen(PORT,(req,res)=>{
    console.log('API Controle de Torneio rodando na porta ' + PORT);
})