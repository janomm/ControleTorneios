const Torneio = require("../Model/Torneio");
const TipoTorneio = require("../Model/TipoTorneio");
const Formato = require("../Model/Formato");
const FormataData = require("../Factory/FormataData");
const JogadorTorneio = require("../Model/JogadorTorneio");
const Jogador = require("../Model/Jogador");
const Deck = require('../Model/Deck');

const lstFases = [ "Cancelado", "Criação", "Divulgação", "Inscrição Interna", "Inserir Resultados", "Divulgação" ];

class TorneioController{
    async Index(req,res){
        try{
            var torneios = await Torneio.FindAll();
            //console.log(torneios);
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
        var {idTipoTorneio,idFormato,nome,data} = req.body;        
        try{
            await Torneio.Create(idTipoTorneio,idFormato,nome,data);
            res.redirect("/torneios");
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Fase(req,res){
        var id = req.params.id;
        try{
            var torneio = await Torneio.FindById(id);
            var dados =
                {
                    torneio: torneio,
                    lst: lstFases
                }
            res.render('./Torneio/Fases',{dados});
        } catch(e){
            console.log(e);
            res.redirect('/logout');
        }
    }

    async EditFase(req,res){
        var param = req.params.param;
        var fase = param.split("&")[0];
        var id = param.split("&")[1];
        try{
            var torneio = await Torneio.FindById(id);
            var ret = await Torneio.Update(torneio.id,torneio.idTipoTorneio,torneio.idFormato,torneio.nome,torneio.data,fase);
            res.redirect("/torneios");

        } catch(e) {
            console.log(e)
            res.redirect('/logout');
        }
    }

    async InsertPlayer(req,res){
        var id = req.params.id;
        try{
            var torneio = await Torneio.FindById(id);
            var players = await Jogador.FindAll();
            
            var jogadores = [];

            
            for(var i = 0 ; i < players.length ; i++){
                var p = players[i];
                
                var jogadorTorneio = await JogadorTorneio.FindJogadorInTorneio(id,p.id);
                //console.log("Torneio: " + id + "; Jogador: " + p.id + "; JogadorTorneio: " + jogadorTorneio);
                if(jogadorTorneio == ""){
                    var d = 
                        {
                            jogadores: p,
                            decks: await Deck.FindAllByFormato(p.id,torneio.idFormato)
                        }
                    jogadores.push(d);
                }
            }

            var dados = 
                {
                    torneio:torneio,
                    jogadores:jogadores
                }
            
            res.render("./Torneio/InserirJogadores",{dados})

        } catch(e){
            console.log(e);
            res.redirect('/logout');
        }
    }

    async InserirJogadores(req,res){
        var {id,idJogador,idDeck} = req.body;

        //console.log("1-> " + id + ";idJogador: " + idJogador + "; idDeck: " + idDeck);

        try{
            for(var i = 0 ; i < idJogador.length ; i++){
                var result = await JogadorTorneio.Create(id,idJogador[i],idDeck[i]);
                //console.log("2-> " + idJogador[i] + "; Result: " + result);
            }
            //console.log(idJogador);
            res.redirect('/torneios/inscritos/'+id);
        } catch(e){
            console.log(e);
            res.redirect('/logout');
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

        var {id,idTipoTorneio,idFormato,nome,data} = req.body;
        try{
            await Torneio.Update(id,idTipoTorneio,idFormato,nome,data);
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

        console.log("Deletar");

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
            var j = await Jogador.FindByEmail(req.session.user.email);
            var torneio = await Torneio.FindById(id,true);
            var jogadores = await JogadorTorneio.FindAllJogadores(id);
            var inscrito;
            var decks = await Deck.FindAllByFormato(j.id,torneio.idFormato);
            
            if (await JogadorTorneio.FindByJogador(id,j.id) == undefined){
                inscrito = false;
            } else {
                inscrito = true;
            }

            var dados = {
                torneio: torneio,
                jogadores: jogadores,
                inscrito: inscrito,
                decks:decks
            }
            res.render('./Torneio/Detalhe',{dados});

        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Inscritos2(req,res){
        var id = req.params.id;
        var jogadorTorneio = await JogadorTorneio.findJogadorTorneioByidTorneio(id)
        var torneio = await Torneio.FindById(id);
        //console.log("Torneio: " + torneio);

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
    async Inscritos(req,res){
        var id = req.params.id;
        var jogadores = await JogadorTorneio.FindAllJogadorTorneioInscritos(id);
        var torneio = await Torneio.FindById(id);
        var jogadoresTorneio = [];

        //console.log(torneio);

        for(var i = 0 ; i < jogadores.length ; i++){
            var jt = jogadores[i];
            //console.log("idFormato: " + torneio.idFormato);
            var decks = await Deck.FindAllByFormato(jt.idJogador,torneio.idFormato);
            var node =
                {
                    jogador:jt,
                    decks:decks
                }
                jogadoresTorneio.push(node);            
        }

        var dados = 
            {
                torneio: torneio,
                jogadores:jogadoresTorneio
            };

            /*console.log("dados: " + dados.jogadores[0].jogador.nome);
            console.log("dados: " + dados.jogadores[0].decks);*/

        if(dados != undefined){
            res.render("./Torneio/Inscritos",{dados});

        } else {
            res.redirect("/logout");
        }
    }

    async Resultados(req,res){
        var id = req.params.id;
        
        var jogadorTorneio = await JogadorTorneio.findJogadorTorneioByidTorneio(id)
        var torneio = await Torneio.FindById(id);
        console.log("Torneio: " + torneio);

        var dados = {
            jogadores: jogadorTorneio,
            torneio: torneio
        }
        
        if(dados != undefined){
            res.render("./Torneio/InserirResultados",{dados});

        } else {
            res.redirect("/logout");
        }
        
        /*var id = req.params.id;
        try{
            var dados = {}
            res.render("./Torneio/InserirResultados",{dados});
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }*/

    }
}

module.exports = new TorneioController;