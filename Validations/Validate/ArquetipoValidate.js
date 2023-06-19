const Arquetipo = require('../Model/Arquetipo');

class ArquetipoValidate{
    async ValidaDelete(req,res){
        var id = req.body.id;

        var deck = await Arquetipo.FindArquetipoDeck(id);
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

        var arquetipo = await Arquetipo.FindArquetipoByNome(nome);
        if(arquetipo != "" && arquetipo != undefined){
            res.status(200);
            res.json({err: "Já existe um registro com este nome."});
            return
        }

        res.status(200);
        res.json({});
        return

    }

}

module.exports = new ArquetipoValidate;