const knex = require('../Database/connection');

class Formato{
    async FindFormatoTorneio(id){
        try{
            var result = await knex.select().table('torneio').where({idFormato:id});
            return result;

        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async FindFormatoDeck(id){
        try{
            var result = await knex.select().table('deck').where({idFormato:id});
            return result;

        } catch(e){
            console.log(e);
            return undefined;
        }
    }
    
    async FindFormatoRanking(nome){
        try{
            var name = nome.nome.trim();
            var result = await knex.select().table('tipotorneio').where({nome:name});
            return result;

        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async FindFormatoByNome(nome){
        try{
            var name = nome.nome.trim();
            var result = await knex.select().table('formato').where({nome:name});
            return result;

        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    
}

module.exports = new Formato;