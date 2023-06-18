const knex = require('../Database/connection');

class TipoTorneio{
    async FindTipoTorneioRanking(id){
        try{
            var result = await knex.select().table('ranking').where({idTipoTorneio:id});
            return result;

        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async FindTipoTorneioTorneio(id){
        try{
            var result = await knex.select().table('torneio').where({idTipoTorneio:id});
            return result;

        } catch(e){
            console.log(e);
            return undefined;
        }
    }
    
    async FindTipoTorneiobyNome(nome){
        try{
            var name = nome.nome.trim();
            var result = await knex.select().table('tipotorneio').where({nome:name});
            return result;

        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    
}

module.exports = new TipoTorneio;