const Jogador = require("../Model/Jogador");

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
        var {id,nome,email,nick,dtNascimento} = req.body;
        try{
            await Jogador.Update(id,nome,email,nick,dtNascimento);
            res.redirect("/Jogadores");
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Delete(req,res){
        var id = req.body.id;

        try{
            await Jogador.Delete(id);
            var jogadores = await Jogador.FindAll();
            res.render('./Jogador/Jogadores',{jogadores});
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

}

module.exports = new JogadorController;