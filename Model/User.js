var knex = require("../Database/connection");
var bcrypt = require("bcrypt");

// var PasswordToken = require("../models/PasswordToken");
const e = require("express");

// Service
class User{
    async new(email,password,nome){
        try{
            var hash = await bcrypt.hash(password,10);
            var retorno = await knex.insert({email,password: hash,nome,role:0}).table("user");
            console.log("Criou");
        } catch(err) {
            console.log(err);
        }
    }

    async findEmail(email){
        try{
            var result = await knex.select().table("user").where({email: email});

            if(result.length > 0){
                return true;
            } else 
            return false;
            console.log(result);
        } catch(err){
            console.log(err);
            return false;
        }
    }

    async findAll(){
        try {
            var result = await knex.select(['id','nome','email','role','status']).table("user");
            return result;
        } catch(err){
            console.log(err);
            return [];
        }
    }

    async findById(id){
        try {
            var result = await knex.select(['id','nome','email','role','status']).table("user").where({id:id});
            if(result.length > 0){
                return result;
            } else {
                return undefined;
            }
            return result;
        } catch(err){
            console.log(err);
            return undefined
        }
    }

    async findBynome(nome){
        try {
            var result = await knex.select(['id','nome','email','role','status']).table("user").where({nome:nome});
            return result;
        } catch(err){
            console.log(err);
            return undefined;
        }
    }

    async findByEmail(email){
        try{
            var result = await knex.select(["id","email","password","role","nome","status"]).where({email:email}).table("user");
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async update(id,email,nome,role){
        var user = await this.findById(id);
        
        if(user == undefined){
            return {status:false,err:"O usuáro não existe"};
        } else {
            var editUser = {};
            if(email != undefined){
                if (email  != user.email){
                    var result = await this.findByEmail(email);
                    if (result == false){
                        editUser.email = email;
                    }
                } else {
                    return {status:false,err:"O e-mail já está cadastrado"};
                }
            }
            if(nome != undefined){
                editUser.nome = nome;
            }

            if(role != undefined){
                editUser.role = role;
            }
            try{
                await knex.update(editUser).table("user").where({id:id});
                return {status:true};
            } catch(err){
                return {status:false,err: err};
            }
        }

    }

    async delete(email){
        var user = await this.findByEmail(email);
        try{
            if(user.status == 0) {
                user.status = 1;
            } else {
                user.status = 0;
            }

            await knex.update(user).table("user").where({id:user.id});
            return true;

        } catch(err){
            console.log(e);
            return false;
        }

        
    }

    
}

module.exports = new User();