const knex = require('../Database/connection');

class Deck{
    async Create(idJogador,idArquetipo,nome,idFormato){
        try{
            await knex.insert({idJogador,idArquetipo,nome,idFormato}).table('deck');
            return true;

        } catch(e){
            console.log(e);
            return false;
        }
    }

    async FindById(id){
        try{
            var deck = await knex.select(['deck.*','jogador.nome as nomeJogador',
                    'arquetipo.nome as nomeArquetipo','formato.nome as nomeFormato'])
                .table("deck")
                .innerJoin("jogador","jogador.id","deck.idJogador")
                .innerJoin("arquetipo","arquetipo.id","deck.idArquetipo")
                .innerJoin("formato","formato.id","deck.idFormato")
                .where('deck.id',id);

            return deck[0];
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async FindAll(idJogador){
        try{
            var decks = await knex.select(['deck.*','jogador.nome as nomeJogador',
                    'arquetipo.nome as nomeArquetipo','formato.nome as nomeFormato'])
                .table("deck")
                .innerJoin("jogador","jogador.id","deck.idJogador")
                .innerJoin("arquetipo","arquetipo.id","deck.idArquetipo")
                .innerJoin("formato","formato.id","deck.idFormato")
                .where('deck.idJogador',idJogador);

            return decks;
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async FindAllByFormato(idJogador,idFormato){
        try{
            var decks = await knex.select(['deck.*','jogador.nome as nomeJogador',
                    'arquetipo.nome as nomeArquetipo','formato.nome as nomeFormato'])
                .table("deck")
                .innerJoin("jogador","jogador.id","deck.idJogador")
                .innerJoin("arquetipo","arquetipo.id","deck.idArquetipo")
                .innerJoin("formato","formato.id","deck.idFormato")
                .whereRaw('deck.idJogador = ' + idJogador + ' and deck.idFormato = ' + idFormato);

            return decks;
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async Delete(id){
        var deck = await this.FindById(id);
        if(deck != undefined){
            try{
                await knex.delete().table('deck').where({id:id});
                return true;
            } catch(e){
                console.log(e);
                return false;
            }
        }
        return false;
    }

    async Update(id,idJogador,idArquetipo,nome,idFormato){
        var deck = await this.FindById(id);
        if(deck != undefined){
            var editDeck = {idJogador,idArquetipo,nome,idFormato};
            try{
                await knex.update(editDeck).table('deck').where({id:id});
                return true;
            } catch(e){
                console.log(e);
                return false;
            }
        }
        return false;
    }

    async FindDeck(idJogador,idArquetipo,nome,idFormato){
        try{
            var where = {idJogador:idJogador,nome:nome,idArquetipo: idArquetipo,idFormato:idFormato};
            //console.log("Params: " + where) 
            var decks = await knex.select(['id','idJogador','idArquetipo','nome','idFormato']).table("deck")
                .where(where);

            //console.log("result: " + result);
            return decks;
            
        } catch(e){
            console.log(e);
            return undefined;
        }
    }


}

module.exports = new Deck