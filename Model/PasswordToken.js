var User = require("../Model/User");
var knex = require("../Database/connection");
var UUID = require("uuid");
var bcrypt = require("bcrypt");

class PasswordToken{
    async create(email){
        var result = await User.findByEmail(email);
        if(result.length > 0){
            try{
                var token = UUID.v1();
                await knex.insert({
                    user_id: result.id,
                    used: 0,
                    token: token // UUID
                }).table("passwordtokens");

                return {status: true,token: token}
            }catch(err){
                console.log(err);
                return {status: false, err: err}
            }
        }else{
            return {status: false, err: "O e-mail passado não existe no banco de dados!"}
        }
    }

    async validate(token){
        try{
            var result = await knex.select().where({token:token}).table("passwordtokens");
            if (result.length > 0) {
                var tk = result[0];
                if(tk.used){
                    return {status:false};
                } else {
                    return {status:true,token:tk};
                }
                return {status:true};
            } else {
                return {status:false}
            }
        } catch(err){
            return {status:false,err:err}
        }
    }

    async setUsed(token){
        await knex.update({used:1}).where({token:token}).table("passwordtokens");
    }

    async changePassword(newPassword,id,token){
        var hash = await bcrypt.hash(newPassword,10);
        try{
            await knex.update({password:hash}).where({id:id}).table("users");
            await this.setUsed(token);

        } catch(err){

        }

    }
}


module.exports = new PasswordToken();