const Jogador = require("../Model/Jogador");
const User = require("../Model/User");

class JogadorController{
    async Index(req,res){
        try{
            var jogadores = await Jogador.FindAll();
            res.render('./Jogador/Jogadores',{jogadores});
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async New(req,res){
        res.render("./Jogador/JogadoresNew");
    }

    async NewJogador(req,res){
        res.render("./Jogador/LoginJogadorNew");
    }

    async Save(req,res){
        var {nome,email,nick,dtNascimento} = req.body;
        try{
            await Jogador.Create(nome,email,nick,dtNascimento);
            res.redirect("/jogadores");
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Edit(req,res){
        var id = req.params.id;
        try{
            var jogador = await Jogador.FindById(id);
            res.render('./Jogador/JogadoresEdit',{jogador});

        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Update(req,res){
        var {id,nick,dtNascimento} = req.body;

        try{
            var jogador = await Jogador.FindById(id);
            
            await Jogador.Update(id,jogador.nome,jogador.email,nick,dtNascimento);
            res.redirect("/home");
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Delete(req,res){
        //var id = req.body.id;
        var id = req.params.id;
        try{
            var jogador = await Jogador.FindById(id);
            
            var deletaUser = await User.delete(jogador.email);
            console.log("Deletou? " + deletaUser);
            /*if(deletaUser){
                await Jogador.Delete(id);
            }*/
            var jogadores = await Jogador.FindAll();
            res.render('./Jogador/Jogadores',{jogadores});
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

}

module.exports = new JogadorController;