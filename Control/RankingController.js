const Ranking = require("../Model/Ranking");
const TipoTorneio = require("../Model/TipoTorneio");
const FormataData = require('../Factory/FormataData');
const Formato = require("../Model/Formato");
const Jogador = require("../Model/Jogador");


class RankingController{
    async Index(req,res){
        try{
            var rankings = await Ranking.FindAll(true);
            res.render("./Ranking/Rankings",{rankings});
        } catch(e){
            console.log(e);
            res.redirect('/logout');
        }
    }

    async New(req,res){
        const tipoTorneios = await TipoTorneio.FindAll();
        const formatos = await Formato.FindAll()
        var dados = {
            tipoTorneios: tipoTorneios,
            formatos: formatos
        }
        console.log("Formato: ", formatos);
        
        res.render("./Ranking/RankingsNew",{dados});
    }

    async MeusRankings(req,res){

        try{
            var jogador = await Jogador.FindByEmail(req.session.user.email);
            var lstRanking = await Ranking.FindAll(true);
                       
            var rankings = [];

            for(var i = 0 ; i < lstRanking.length ; i++){
                var ranking = lstRanking[i];

                var rankingCompleto = await Ranking.FindRankingCompleto(ranking.id);
                var contem = false;
                
                for(var j = 0 ; j < rankingCompleto.length; j++ ){
                    var r = rankingCompleto[j];
                    if(r.nome == jogador.nome) {
                        contem = true;
                    }
                }
                if(contem){
                    rankings.push(ranking);
                }
            }

            for(var k = 0 ; k < rankings.length ; k++){
                console.log(rankings[k]);
            }

            res.render('./Ranking/MeusRankings',{rankings});

        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
        
    }
    
    async Save(req,res){
        var {nome,idTipoTorneio,dtInicio,dtFinal,idFormato} = req.body;
        try{
            await Ranking.Create(idTipoTorneio,nome,dtInicio,dtFinal,idFormato);
            res.redirect('/Rankings');
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async View(req,res){
        var id = req.params.id;
        try{
            var ranking = await Ranking.FindById(id,true);
            var result  = await Ranking.FindRankingCompleto(id);
            
            var dados = {
                ranking: ranking,
                classificacao: result
            }
            res.render('./Ranking/RankingsView',{dados});

        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async ViewJogador(req,res){
        var id = req.params.id;
        try{
            var ranking = await Ranking.FindById(id,true);
            var result  = await Ranking.FindRankingCompleto(id);
            
            var dados = {
                ranking: ranking,
                classificacao: result
            }
            res.render('./Ranking/RankingsViewJogador',{dados});

        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Delete(req,res){
        var id = req.body.id;
        try{
            await Ranking.Delete(id);
            res.redirect('/rankings');
        } catch(e){
            console.log(e);
            res.redirect('/logout');
        }
    }


}

module.exports = new RankingController