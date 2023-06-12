const knex = require("../Database/connection");

class Arquetipo{
    async Create(nome){
        try{
            await knex.insert({nome}).table('arquetipo');
            return true;

        } catch(e){
            console.log(e);
            return false;
        }
    }

    async FindById(id){
        try{
            var arquetipo = await knex.select().table("arquetipo").where({id:id});
            return arquetipo[0];
        } catch(e){
            console.log(e);
            return undefined;
        }
    }
    
    async FindAll(){
        try{
            var result = await knex.select(['id','nome']).table('arquetipo');
            return result;
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async Delete(id){
        var arquetipo = await this.FindById(id);
        if(arquetipo != undefined){
            try{
                await  knex.delete().table('arquetipo').where({id:id});
                return true;
            } catch(e){
                console.log(e);
                return false;
            }
        }
        return false;
    }
}

module.exports = new Arquetipo;