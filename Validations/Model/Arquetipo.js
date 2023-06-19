const knex = require('../Database/connection');

class Arquetipo{
    async FindArquetipoDeck(id){
        try{
            var result = await knex.select().table('deck').where({idFormato:id});
            return result;

        } catch(e){
            console.log(e);
            return undefined;
        }
    }
    
    async FindArquetipoByNome(nome){
        try{
            var name = nome.nome.trim();
            var result = await knex.select().table('arquetipo').where({nome:name});
            return result;

        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    
}

module.exports = new Arquetipo;