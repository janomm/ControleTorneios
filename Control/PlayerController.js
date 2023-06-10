const Jogador = require("../Model/Jogador");
const JogadorTorneio = require("../Model/JogadorTorneio");
const Torneio = require("../Model/Torneio");


class PlayerController{
    async Home(req,res){
        var jogador = await Jogador.FindByEmail(req.session.user.email);
        var torneios = await Torneio.FindTorneios("A");

        var dados = {
            jogador: jogador,
            torneios: torneios
        }

        if(jogador != undefined){
            res.render("./Usuario/Home",{dados});

        } else {
            res.redirect("/logout");
        }

    };

    async Perfil(req,res){
        var jogador = await Jogador.FindByEmail(req.session.user.email);
        if(jogador != undefined){
            res.render("./Usuario/Perfil",{jogador});

        } else {
            res.redirect("/logout");
        }
    }

    async Inscrever(req,res){
        var id = req.params.id;
        var jogador = await Jogador.FindByEmail(req.session.user.email);
        try{
            await JogadorTorneio.Create(id,jogador.id);
            res.redirect('/torneios/detalhe/' + id);

        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Cancelar(req,res){
        var id = req.params.id;
        var jogador = await Jogador.FindByEmail(req.session.user.email);
        try{
            await JogadorTorneio.Delete(id,jogador.id);
            res.redirect('/torneios/detalhe/' + id);

        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Anteriores(req,res){
        var jogador = await Jogador.FindByEmail(req.session.user.email);
        var torneios = await JogadorTorneio.FindTorneiosJogador(jogador.id,"F");

        var dados = {
            jogador: jogador,
            torneios: torneios
        }

        if(jogador != undefined){
            res.render("./Torneio/Finalizados",{dados});

        } else {
            res.redirect("/logout");
        }
    }

    async Classificacao(req,res){
        var id = req.params.id;
        var jogadorTorneio = await JogadorTorneio.findJogadorTorneioByidTorneio(id)
        var torneio = await Torneio.FindById(id);

        var dados = {
            jogadores: jogadorTorneio,
            torneio: torneio
        }
        //console.log('jogadorTorneio: ' + jogadorTorneio + ", torneio: " + torneio);

        if(dados != undefined){
            res.render("./Torneio/ClassificacaoJogadores",{dados});

        } else {
            res.redirect("/logout");
        }
    }

    async DeleteInscrito(req,res){
        var {idJogador,idTorneio} = req.body;
        try{
            //await JogadorTorneio.Delete(idTorneio,idJogador);
            res.redirect('/torneios/inscritos/' + idTorneio);

        } catch(e){
            res.redirect("/logout");
        }
        

    }

    async AtualizaInscrito(req,res){
        var {idTorneio,idJogador,posicao,pontos} = req.body;
        
        for(var i=0;i < idJogador.length;i++){
            console.log(idTorneio,idJogador[i],posicao[i],pontos[i]);
            await JogadorTorneio.Update(idTorneio,idJogador[i],posicao[i],pontos[i]);
        }

        res.redirect("/torneios/inscritos/"+idTorneio);

    }

    //Incompleto
    async Update(req,res){
        var {id,posicao,pontos} = req.params;
        var jogadorTorneio = JogadorTorneio.Update
        var jogador = await Jogador.FindByEmail(req.session.user.email);
        try{
            await JogadorTorneio.Create(id,jogador.id);
            res.redirect('/torneios/detalhe/' + id);

        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }
}


module.exports = new PlayerController;