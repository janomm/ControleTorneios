const Formato = require('../Model/Formato');

class FormatoValidate{
    async ValidaDelete(req,res){
        var id = req.body.id;

        var ranking = await Formato.FindFormatoRanking(id);
        if(ranking != "" && ranking != undefined){
            res.status(200);
            res.json({err: "Não pode ser deletado! Existe pelo menos um Ranking vinculado a este registro."});
            return
        }

        var torneio = await Formato.FindFormatoTorneio(id);
        if(torneio != "" && torneio != undefined){
            res.status(200);
            res.json({err: "Não pode ser deletado! Existe pelo menos um Torneio vinculado a este registro."});
            return
        }

        var deck = await Formato.FindFormatoDeck(id);
        if(deck != "" && deck != undefined){
            res.status(200);
            res.json({err: "Não pode ser deletado! Existe pelo menos um Deck vinculado a este registro."});
            return
        }

        res.status(200);
        res.json({});
        return

    }

    async ValidaInsert(req,res){
        var nome = req.body;

        var formato = await Formato.FindFormatoByNome(nome);
        if(formato != "" && formato != undefined){
            res.status(200);
            res.json({err: "Já existe um registro com este nome."});
            return
        }

        res.status(200);
        res.json({});
        return

    }

}

module.exports = new FormatoValidate;