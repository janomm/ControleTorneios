const knex = require('../Database/connection');

class Ranking{
    async Inclusao(idTipoTorneio,dtInicio,dtFinal){
        try{
           var result = await knex.select().table('ranking')
                .whereRaw(`ranking.idTipoTorneio = ${idTipoTorneio} 
                and (ranking.dtInicio <= '${dtInicio}' and ranking.dtFinal >= '${dtInicio}'
                or ranking.dtInicio <= '${dtFinal}' and ranking.dtFinal >= '${dtFinal}'
                or ranking.dtInicio >= '${dtInicio}' and ranking.dtFinal <= '${dtFinal}')`)
            
                return result;
            } catch(e){
            console.log(e);
            return undefined;
        }
    }
}

module.exports = new Ranking;