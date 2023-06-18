const knex = require('../Database/connection');

const bcrypt = require('bcrypt');

class Login{
    async FindUserByEmail(email){
        try{
            var result = await knex.select().table('user').where({email:email});
            return result[0];

        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async ValidaUserPassword(email,password){
        try{
            var user = await this.FindUserByEmail(email);
            if(user != undefined){
                var correct = bcrypt.compareSync(password,user.password);
                if(correct){
                    if(user.status == 0){
                        return "Você não tem permissão para acessar o sistema."
                    } else {
                        return "";
                    }
                } else {
                    return "Senha Incorreta."
                }
            }

        } catch(e){
            console.log(e);
            return "";
        }

    }


    async Logar(email,password){
        var {email,password} = req.params;

        console.log(email,password);
        /*try{
           var result = await knex.select().table('ranking')
                .whereRaw(`ranking.idTipoTorneio = ${idTipoTorneio} 
                and (ranking.dtInicio <= '${dtInicio}' and ranking.dtFinal >= '${dtInicio}'
                or ranking.dtInicio <= '${dtFinal}' and ranking.dtFinal >= '${dtFinal}'
                or ranking.dtInicio >= '${dtInicio}' and ranking.dtFinal <= '${dtFinal}')`)
            
                return result;
            } catch(e){
            console.log(e);
            return undefined;
        }*/
    }
}

module.exports = new Login;