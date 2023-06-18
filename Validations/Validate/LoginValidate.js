const Login = require('../Model/Login');

class LoginValidate{
    async ValidaLogin(req,res){
        var {email,password} = req.body;

        if(email.trim().length == 0 || email == undefined || password == undefined || password.trim().length == 0 ){
            res.status(200);
            res.json({err: "Campos e email e senha devem ser informados."});
            return
        }

        var user = await Login.FindUserByEmail(email);
        if(user == "" || user == undefined){
            res.status(200);
            res.json({err: "E-mail inválido."});
            return
        }

        var logou = await Login.ValidaUserPassword(email,password);
        if(logou != ""){
            console.log(logou)
            res.status(200);
            res.json({err: logou});
            return
        }

        res.status(200);
        res.json({});
        return
    }

    async ValidaCriacaoUser(req,res){
        var {nome,email,password,password2} = req.body;
        console.log(nome,email,password,password2);

        if(nome.trim().length == 0 || nome == undefined){
            res.status(200);
            res.json({err: "Nome deve ser informado."});
            return
        }

        if(email.trim().length == 0 || email == undefined){
            res.status(200);
            res.json({err: "Email deve ser informado."});
            return
        }

        if(password == undefined || password.trim().length == 0 || password2 == undefined || password2.trim().length == 0 ){
            res.status(200);
            res.json({err: "Campos de senha devem ser informados."});
            return
        }

        var user = await Login.FindUserByEmail(email);
        if(user != "" && user != undefined){
            res.status(200);
            res.json({err: "Email já cadastrado no sistema."});
            return
        }

        if(password != password2){
            res.status(200);
            res.json({err: "Senhas digitadas não são iguais."});
            return
        }

        res.status(200);
        res.json({});
        return
    }

}

module.exports = new LoginValidate;