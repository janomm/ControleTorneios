var User = require("../Model/User");
var PasswordToken = require("../Model/PasswordToken");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const Jogador = require("../Model/Jogador");
//const session = require('express-session');

var secret = "9793719213212002348208402934u029343454";

class UserController{
    async Index(req,res){

        res.render('./Login/Login');
        
    }

    async Logout(req,res){
        req.session.user = undefined;
        req.session.root = undefined;
        res.redirect("/login");
    }
    
    async Auth(req,res){
        var {email,password} = req.body;
        
        try{
            var user = await User.findByEmail(email);
            if(user.status == 0){
                res.redirect('/logout');
            }
            if(user != undefined){
                //Validar Senha
                var correct = bcrypt.compareSync(password,user.password)
                if(correct){
                    if(user.role == 0){
                        req.session.user = user;
                        res.redirect("/home");
                    } else {
                        req.session.root = user;
                        res.render('index')
                    }
                }
            }
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    /*async Auth(req,res){
        var {email,password} = req.body;
        
        try{
            var user = await User.findByEmail(email);
            if(user != undefined){
                //Validar Senha
                var correct = bcrypt.compareSync(password,user.password)
                if(correct){
                    if(user.role == 1){
                        req.session.root = user;
                    } else {
                        req.session.user = user;
                    }
                    res.redirect("/home");
                }               

            / *} else {
                if(email == 'root' && password == 'Teste123'){
                    req.session.root = "root";
                    res.redirect('/');
                } else {
                    res.redirect('/login');
                } * /
            }
            res.redirect('/login');
        } catch(e){
            console.log(e);
            return undefined;
        }
    }*/
    
    async findUser(req,res){
        var id = req.params.id;
        var user = await User.findById(id);
        if(user == undefined){
            res.status(404);
            res.json({});
        } else {
            res.status(200);
            res.json(user);
        }
    }

    async create(req,res){
        var {email,nome,password} = req.body;
        
        if(email == undefined || email.trim().length == 0) {
            res.status(400);
            res.json({err: "O email é inválido"});
            return;
        }
        
        if(nome == undefined || nome.trim().length == 0) {
            res.status(400);
            res.json({err: "O nome é inválido"});
            return;
        }

        if(password == undefined || password.trim().length == 0) {
            res.status(400);
            res.json({err: "A senha é inválida"});
            return;
        }

        var emailExists = await User.findEmail(email);
        if (emailExists) {
            res.status(406);
            res.json({err: "O email já está cadastrado"});
            return;
        }

        await User.new(email,password,nome);
        res.status(200);
        res.send("Tudo Ok");
    }

    async edit(req,res){
        var {id, nome, role, email } = req.body;
        var result = await User.update(id,email,nome,role);
        if (result != undefined){
            if(result.status){
                res.status(200);
                res.send("Tudo Ok");
            } else {
                res.status(406);
                // res.send(res.err);
                res.send("Ocorreu um erro no servidor");
            }
        }
    }

    async remove(req,res){
        var id = req.params.id;
        var result = await User.delete(id);
        if (result.status) {
            res.status(200);
            res.send("Tudo OK");
        } else {
            res.status(406);
            res.send(result.err);
        }
    }

    async recoverPassword(req,res){
        var email = req.body.email;

        var result = await PasswordToken.create(email);
        
        if(result.status){
            res.status(200);
            res.send("" + result.token);    
        } else {
            res.status(406);
            res.send(result.err);
        }
    }

    async changePassword(req,res){
        var token = req.body.token;
        var password = req.body.password;

        var isTokenValid = await PasswordToken.validate(token);
        if (isTokenValid.status){
            await PasswordToken.changePassword(password,isTokenValid.token.user_id,isTokenValid.token.token);
            res.status(200);
            res.send("Senha Alterada");

        } else {
            res.status(406);
            res.send("Token Inválido");
        }
    }

    async login(req,res){
        var {email,password} = req.body;

        if (email == undefined || password == undefined) {
            res.status(406);
            res.send("Parâmetros Inválidos");
            return;
        }

        var user = await User.findByEmail(email);
        if(user != undefined){ 
            var result = await bcrypt.compare(password, user.password);
            if(result){
                var token = jwt.sign({ email: email, role: user.role }, secret);
                res.status(200);
                res.json({token: token});
            } else {
                res.status(406);
                res.json( {err: "Senha incorreta!"});
            }
            
        } else {
            res.status(406);
            res.json({status:false, err: "Usuário não encontrado!"})
            // res.send("Usuário inválido");
        }
    }

    async NewJogador(req,res){
        var {nome,email,nick,dtNascimento,password,password2} = req.body;
        //Inserir Validações
        try{
            console.log(nome,email,nick,dtNascimento,password,password2)
            if(await Jogador.Create(nome,email,nick,dtNascimento)){
                if(await User.new(email,password,nome)){
                    res.redirect("/login");
                }
            }
            res.redirect("/logout");
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }


        //res.render('./Jogador/LoginJogadorNew')
    }
}

module.exports = new UserController();