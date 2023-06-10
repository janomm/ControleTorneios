const knex = require('../Database/connection');
const FormataData = require('../Factory/FormataData');

class JogadorTorenio{
    async Create(idTorneio,idJogador){
        try{
            await knex.insert({idTorneio,idJogador}).table('jogadorTorneio');
            return true;

        } catch(e){
            console.log(e);
            return false;
        }
    }

    async FindByJogador(idTorneio,idJogador){
        try{
            var formato = await knex.select().table("jogadorTorneio").where({idTorneio:idTorneio,idJogador:idJogador});
            return formato[0];
        } catch(e){
            console.log(e);
            return undefined;
        }
    }
    
    async FindAllJogadores(idTorneio){
        try{
            var result = await knex.select(['Jogador.nome','Jogador.id'])
                .table("jogadorTorneio")
                .innerJoin("torneio","jogadorTorneio.idTorneio","torneio.id")
                .innerJoin("jogador","jogadorTorneio.idJogador","jogador.id")
                .where('jogadorTorneio.idTorneio',idTorneio);
            
            
            return result;
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async FindTorneiosJogador(idJogador,param){
        var ativos;
        if(param == true){
            ativos = 1;
        } else {
            ativos = 0;
        }
        try{
            var result = await knex.select(['torneio.*','jogadorTorneio.posicao','jogadorTorneio.pontos'
                ,'tipoTorneio.nome as tipoTorneioNome',"formato.nome as formatoNome"])
                .table("jogadorTorneio")
                .innerJoin("torneio","jogadorTorneio.idTorneio","torneio.id")
                .innerJoin("jogador","jogadorTorneio.idJogador","jogador.id")
                .innerJoin("tipoTorneio","tipoTorneio.id","torneio.idTipoTorneio")
                .innerJoin("formato","formato.id","torneio.idFormato")
                .where({idJogador:idJogador,habilitaTorneio:ativos});
            
                result.forEach(r => {
                    r.data = FormataData.Long(r.data);
                })
            return result;
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async findJogadorTorneioByidTorneio(idTorneio){
        try{
            var result = await knex.select(['jogadortorneio.posicao','jogadortorneio.pontos','torneio.nome as nomeTorneio',
                'torneio.data','jogador.nome as nomeJogador','jogadortorneio.idJogador','torneio.habilitaTorneio'])
                .table('jogadortorneio')
                .innerJoin('torneio','torneio.id','jogadortorneio.idTorneio')
                .innerJoin('jogador','jogador.id','jogadortorneio.idJogador')
                .where("jogadorTorneio.idTorneio",idTorneio)
                .orderBy('jogadorTorneio.posicao','asc');

                result.forEach(r => {
                    r.data = FormataData.Long(r.data);
                });

            return result;
        } catch(e){
            console.log(e);
            return undefined;
        }

    }

    async Delete(idTorneio,idJogador){
        try{
            await  knex.delete().table('jogadorTorneio').where({idTorneio:idTorneio,idJogador,idJogador});
            return true;
        } catch(e){
            console.log(e);
            return false;
        }
    
    }

    //Incompleto
    async Update(idTorneio,idJogador,posicao,pontos){

        var editJogadorTorneio = {posicao,pontos};
        try{
            await knex.update(editJogadorTorneio).table('JogadorTorneio').where({idTorneio:idTorneio,idJogador:idJogador});
            return true;
        }
        catch(e){
            console.log(e);
            return false;
        }
        
    }
}

module.exports = new JogadorTorenio;