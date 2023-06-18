const TipoTorneio = require('../Model/TipoTorneio');

class TipoTorneioValidate{
    async ValidaDelete(req,res){
        var id = req.body.id;

        var ranking = await TipoTorneio.FindTipoTorneioRanking(id);
        if(ranking != "" && ranking != undefined){
            res.status(200);
            res.json({err: "Não pode ser deletado! Existe um Ranking vinculado a este registro."});
            return
        }

        var torneio = await TipoTorneio.FindTipoTorneioTorneio(id);
        if(torneio != "" && torneio != undefined){
            res.status(200);
            res.json({err: "Não pode ser deletado! Existe um Torneio vinculado a este registro."});
            return
        }

        res.status(200);
        res.json({});
        return

    }

    async ValidaInsert(req,res){
        var nome = req.body;

        var tipoTorneio = await TipoTorneio.FindTipoTorneiobyNome(nome);
        if(tipoTorneio != "" && tipoTorneio != undefined){
            res.status(200);
            res.json({err: "Já existe um registro com este nome."});
            return
        }

        res.status(200);
        res.json({});
        return

    }

}

module.exports = new TipoTorneioValidate;