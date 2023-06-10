const Torneio = require("../Model/Torneio");
const TipoTorneio = require("../Model/TipoTorneio");
const Formato = require("../Model/Formato");
const FormataData = require("../Factory/FormataData");
const JogadorTorneio = require("../Model/JogadorTorneio");
const Jogador = require("../Model/Jogador");

class TorneioController{
    async Index(req,res){
        try{
            var torneios = await Torneio.FindAll();
            console.log(torneios);
            res.render('./Torneio/Torneios',{torneios});
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async New(req,res){
        const tipoTorneios = await TipoTorneio.FindAll();
        const formatos = await Formato.FindAll();

        var dados = {
            tipoTorneios: tipoTorneios,
            formatos: formatos
        }

        res.render("./Torneio/TorneiosNew",{dados});
    }

    async Save(req,res){
        var {idTipoTorneio,idFormato,habilitaTorneio,nome,data} = req.body;        
        try{
            if(habilitaTorneio == "on"){habilitaTorneio = 1} else {habilitaTorneio = 0}
            await Torneio.Create(idTipoTorneio,idFormato,habilitaTorneio,nome,data);
            res.redirect("/torneios");
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Edit(req,res){
        var id = req.params.id;
        try{
            var torneio = await Torneio.FindById(id);
            var tipoTorneio = await TipoTorneio.FindAll();
            var formatos = await Formato.FindAll();
            var dados = {
                torneio: torneio,
                tipoTorneio: tipoTorneio,
                formatos: formatos
            }
            res.render('./Torneio/TorneiosEdit',{dados});

        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Update(req,res){

        var {id,idTipoTorneio,idFormato,habilitaTorneio,nome,data} = req.body;
        try{
            await Torneio.Update(id,idTipoTorneio,idFormato,habilitaTorneio,nome,data);
            res.redirect("/Torneios");
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Enable(req,res){
        var id = req.params.id;
        try{
            await Torneio.Enable(id);
            res.redirect('/torneios');

        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Delete(req,res){
        var id = req.body.id;

        try{
            await Torneio.Delete(id);
            var torneios = await Torneio.FindAll();
            res.render('./Torneio/Torneios',{torneios});
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Detalhe(req,res){
        var id = req.params.id;
        try{
            var torneio = await Torneio.FindById(id,true);
            var jogadores = await JogadorTorneio.FindAllJogadores(id);
            var j = await Jogador.FindByEmail(req.session.user.email);
            var inscrito;
            if (await JogadorTorneio.FindByJogador(id,j.id) == undefined){
                inscrito = false;
            } else {
                inscrito = true;
            }

            var dados = {
                torneio: torneio,
                jogadores: jogadores,
                inscrito: inscrito
            }
            res.render('./Torneio/Detalhe',{dados});

        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Inscritos(req,res){
        var id = req.params.id;
        var jogadorTorneio = await JogadorTorneio.findJogadorTorneioByidTorneio(id)
        var torneio = await Torneio.FindById(id);

        var dados = {
            jogadores: jogadorTorneio,
            torneio: torneio
        }
        
        if(dados != undefined){
            res.render("./Torneio/Inscritos",{dados});

        } else {
            res.redirect("/logout");
        }
    }

}

module.exports = new TorneioController;