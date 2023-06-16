const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./Routers/router");
const session = require('express-session');
const PORT = 8080;
//const { validate, ValidationError, Joi } = require('express-validation');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//view engine
app.set("view engine","ejs");

app.use(session({
    secret: "ControleTorneioSession",
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 7200000} //Duas horas
    
}));

app.use("/",router);

app.listen(PORT,(req,res) => {
    console.log("Executando na porta " + PORT + " - " + new Date() );
})
