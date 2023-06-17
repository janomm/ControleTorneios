const knex = require('../Database/connection');
const FormataData = require('../Factory/FormataData');

class Ranking{
    async Create(idTipoTorneio,nome,dtInicio,dtFinal){
        try{
            await knex.insert({idTipoTorneio,nome,dtInicio,dtFinal}).table('ranking');
            return true;
        } catch(e){
            console.log(e);
            return false;
        }
    }

    async FindById(id,fData){
        try{
            var result = await knex.select(['ranking.*','TipoTorneio.nome as TipoTorneioNome'])
                .table("ranking")
                .innerJoin("TipoTorneio","TipoTorneio.id","ranking.idTipoTorneio")
                .where('ranking.id',id);

            result.forEach(function(r, i) {
                if(fData) {
                    r.dtInicio = FormataData.Long(r.dtInicio);
                    r.dtFinal = FormataData.Long(r.dtFinal);
                } else {
                    r.dtInicio = FormataData.Short(r.dtInicio);
                    r.dtFinal = FormataData.Short(r.dtFinal);
                }
            });
            return result[0];
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async FindAll(fData){
        try{
            var result = await knex.select(['ranking.*','TipoTorneio.nome as TipoTorneioNome'])
                .table("ranking")
                .innerJoin("TipoTorneio","TipoTorneio.id","ranking.idTipoTorneio")
                
            result.forEach(function(r, i) {
                if(fData) {
                    r.dtInicio = FormataData.Long(r.dtInicio);
                    r.dtFinal = FormataData.Long(r.dtFinal);
                } else {
                    r.dtInicio = FormataData.Short(r.dtInicio);
                    r.dtFinal = FormataData.Short(r.dtFinal);
                }
            });
            return result;
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async FindRankingCompleto(id){
        try{
            var result = await knex.select(['jogador.nome',knex.raw('sum(jogadortorneio.pontos) as pontos'),'formato.nome as nomeFormato'])
                .table('ranking')
                .innerJoin('tipotorneio','tipotorneio.id','ranking.idTipoTorneio')
                .innerJoin('torneio','tipotorneio.id','torneio.idTipoTorneio')
                //.innerJoin('formato','formato.id','torneio.idFormato')
                .innerJoin('jogadortorneio','torneio.id','jogadortorneio.idTorneio')
                .innerJoin('jogador','jogadortorneio.idJogador','jogador.id')
                .groupBy('jogador.nome').orderBy('pontos','desc')
                .whereRaw('ranking.id = ' + id + ' and torneio.habilitaTorneio = 0 and torneio.data >= ranking.dtInicio and torneio.data <= ranking.dtFinal');
            
            return result;
        } catch(e){
            console.log(e);
            return undefined;

        }
    }

    async Delete(id){
        var ranking = await this.FindById(id,true);
        if(ranking != undefined){
            try{
                await knex.delete().table('ranking').where({id:id});
                return true;
            } catch(e){
                console.log(e);
                return false;
            }
        }
        return false;
    }

    async Update(id,idTipoTorneio,nome,dtInicio,dtFinal){
        var ranking = await this.FindById(id,true);
        if(ranking != undefined){
            try{
                var editRanking = {idTipoTorneio,nome,dtInicio,dtFinal};
                await knex.Update(editRanking).where({id:id});
                return true;
            } catch(e){
                console.log(e)
                return false;
            }
        } else {
            return false;
        }
    }
}

module.exports = new Ranking;