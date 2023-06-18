const Ranking = require('../Model/Ranking');

class RankingValidate{
    async ValidateInsert(req,res){
        var {idTipoTorneio,nome,dtInicio,dtFinal} = req.body;
        
        //console.log(idTipoTorneio,nome,dtInicio,dtFinal);

        if(nome == undefined || nome.trim().length == 0){
            res.status(200);
            res.json({err: "Campo nome deve ser preenchido."});
            return
        }

        if(dtInicio == undefined || dtInicio == ""){
            res.status(200);
            res.json({err: "Data Inicial deve ser informada."});
            return
        }

        if(dtFinal == undefined || dtFinal == ""){
            res.status(200);
            res.json({err: "Data Final deve ser informada"});
            return
        }

        if(dtInicio > dtFinal){
            res.status(200);
            res.json({err: "Data inicial deve ser antes da data final."});
            return
        }

        if(idTipoTorneio == undefined || idTipoTorneio == 0 || idTipoTorneio.toString().trim().length == 0){
            res.status(200);
            res.json({err: "Tipo de Torneio deve ser informado."});
            return
        }

        var result = await Ranking.Inclusao(idTipoTorneio,dtInicio,dtFinal);
        if(result == undefined || result != ""){
            res.status(200);
            res.json({err:"Já existe um ranking para este tipo de formato neste período."});
            return
        }

        res.status(200);
        res.json({});
        return
    }
}

module.exports = new RankingValidate;