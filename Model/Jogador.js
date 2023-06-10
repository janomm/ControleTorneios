const knex = require("../Database/connection");
const FormataData = require("../Factory/FormataData");

class Jogador{
    async Create(nome,email,nick,dtNascimento){
        try{
            await knex.insert({nome,email,nick,dtNascimento}).table('Jogador');
            return true;

        } catch(e){
            console.log(e);
            return false;
        }
    }

    async FindById(id){
        try{
            var jogador = await knex.select().table("Jogador").where({id:id});
            jogador.forEach(function(j, i) {
                j.dtNascimento = FormataData.Short(j.dtNascimento);
            })
            return jogador[0];
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async FindByEmail(email){
        try{
            var jogador = await knex.select().table("Jogador").where({email:email});
            jogador.forEach(function(j, i) {
                j.dtNascimento = FormataData.Short(j.dtNascimento);
            })
            return jogador[0];
        } catch(e){
            console.log(e);
            return undefined;
        }
    }
    
    async FindAll(){
        try{
            var result = await knex.select(['id','nome','email','nick','dtNascimento']).table('Jogador');
            result.forEach(function(jogador, i) {
                jogador.dtNascimento = FormataData.Long(jogador.dtNascimento);
            })
            return result;
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async Delete(id){
        var jogador = await this.FindById(id);
        if(jogador != undefined){
            try{
                await  knex.delete().table('Jogador').where({id:id});
                return true;
            } catch(e){
                console.log(e);
                return false;
            }
        }
        return false;
    }

    async Update(id,nome,email,nick,dtNascimento){
        var jogador = this.FindById(id);
        if(nome.trim().length == 0){
            return false;
        }
        var editJogador = {nome,email,nick,dtNascimento};
        if (jogador != undefined){
            try{
                await knex.update(editJogador).table('Jogador').where({id:id});
                return true;
            }
            catch(e){
                console.log(e);
                return false;
            }
        }
        return false;
    }

}

module.exports = new Jogador;