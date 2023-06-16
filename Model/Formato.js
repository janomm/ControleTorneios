const knex = require("../Database/connection");

class Formato{
    async Create(nome){
        try{
            await knex.insert({nome}).table('formato');
            return true;

        } catch(e){
            console.log(e);
            return false;
        }
    }

    async FindById(id){
        try{
            var formato = await knex.select().table("formato").where({id:id});
            return formato[0];
        } catch(e){
            console.log(e);
            return undefined;
        }
    }
    
    async FindAll(){
        try{
            var result =
                await knex.select(['id','nome']).table('formato');
            return result;
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async Delete(id){
        var formato = await this.FindById(id);
        if(formato != undefined){
            try{
                await  knex.delete().table('formato').where({id:id});
                return true;
            } catch(e){
                console.log(e);
                return false;
            }
        }
        return false;
    }

    async FindByNome(nome){
        try{
            var formato = await knex.select().table("formato").where({nome:nome});
            return formato[0];
        } catch(e){
            console.log(e);
            return undefined;
        }
    }
}

module.exports = new Formato;