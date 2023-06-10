const Ranking = require("../Model/Ranking");
const TipoTorneio = require("../Model/TipoTorneio");
const FormataData = require('../Factory/FormataData');


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
        res.render("./Ranking/RankingsNew",{tipoTorneios});
    }

    async Save(req,res){
        var {nome,idTipoTorneio,dtInicio,dtFinal} = req.body;
        try{
            await Ranking.Create(idTipoTorneio,nome,dtInicio,dtFinal);
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