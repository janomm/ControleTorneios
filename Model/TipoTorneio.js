const knex = require("../Database/connection");

class TipoTorneio{
    async Create(nome){
        try{
            await knex.insert({nome}).table('TipoTorneio');
            return true;

        } catch(e){
            console.log(e);
            return false;
        }
    }

    async FindById(id){
        try{
            var tipoTorneio = await knex.select().table("TipoTorneio").where({id:id});
            return tipoTorneio[0];
        } catch(e){
            console.log(e);
            return undefined;
        }
    }
    
    async FindAll(){
        try{
            var result =
                await knex.select(['id','nome']).table('TipoTorneio');
            return result;
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async Delete(id){
        var tipoTorneio = await this.FindById(id);
        if(tipoTorneio != undefined){
            try{
                await  knex.delete().table('TipoTorneio').where({id:id});
                return true;
            } catch(e){
                console.log(e);
                return false;
            }
        }
        return false;
    }
}

module.exports = new TipoTorneio;