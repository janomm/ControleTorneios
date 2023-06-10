const knex = require("../Database/connection");
const FormataData = require("../Factory/FormataData");

class Torneio{
    async Create(idTipoTorneio,idFormato,habilitaTorneio,nome,data){
        try{
            if(idTipoTorneio != undefined){
                await knex.insert({idTipoTorneio,idFormato,habilitaTorneio,nome,data}).table('Torneio');
                return true;
            }
        } catch(e){
            console.log(e);
            return false;
        }
    }

    async FindById(id,fData){
        try{
            var torneio = await knex.select(['torneio.*','TipoTorneio.nome as TipoTorneioNome','Formato.nome as FormatoNome'])
                .table("Torneio")
                .innerJoin("TipoTorneio","TipoTorneio.id","Torneio.idTipoTorneio")
                .innerJoin("Formato","Formato.id","Torneio.idFormato")
                .where('torneio.id',id);

            torneio.forEach(function(t, i) {
                if(fData) {
                    t.data = FormataData.Long(t.data);
                } else {
                    t.data = FormataData.Short(t.data);
                }
                if(t.habilitaTorneio == 1) {t.habilitaTorneio = true} else {t.habilitaTorneio = false}
            });
            return torneio[0];
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async FindTorneios(param){
        var habilitaTorneio;
        if(param == "A"){
            habilitaTorneio = 1
        } else {
            habilitaTorneio = 0
        }

        try{
            var result = await knex.select(['torneio.*','TipoTorneio.nome as TipoTorneioNome','Formato.nome as FormatoNome'])
                .table("Torneio")
                .innerJoin("TipoTorneio","TipoTorneio.id","Torneio.idTipoTorneio")
                .innerJoin("Formato","Formato.id","Torneio.idFormato")
                .where('torneio.habilitaTorneio',habilitaTorneio);
            
            result.forEach(function(torneio, i) {
                torneio.data = FormataData.Long(torneio.data);
                if(torneio.habilitaTorneio == 1) {torneio.habilitaTorneio = "Habilitado"} else {torneio.habilitaTorneio = "Finalizado"}
            });
            return result;
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async FindAll(){
        try{
            var result = await knex.select(['torneio.*','TipoTorneio.nome as TipoTorneioNome','Formato.nome as FormatoNome'])
                .table("Torneio")
                .innerJoin("TipoTorneio","TipoTorneio.id","Torneio.idTipoTorneio")
                .innerJoin("Formato","Formato.id","Torneio.idFormato")
            
            result.forEach(function(torneio, i) {
                torneio.data = FormataData.Long(torneio.data);
                if(torneio.habilitaTorneio == 1) {torneio.habilitaTorneio = "Habilitado"} else {torneio.habilitaTorneio = "Finalizado"}
            });
            return result;
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async Delete(id){
        var torneio = await this.FindById(id);
        if(torneio != undefined){
            try{
                await knex.delete().table('Torneio').where({id:id});
                return true;
            } catch(e){
                console.log(e);
                return false;
            }
        }
        return false;
    }

    async Enable(id){
        var habilitaTorneio = await this.FindById(id);
        if(habilitaTorneio != undefined){
            try{
                habilitaTorneio.habilitaTorneio = 1;
                var torneio = {
                    id: habilitaTorneio.id,
                    idTipoTorneio: habilitaTorneio.idTipoTorneio,
                    idFormato: habilitaTorneio.idFormato,
                    habilitaTorneio: habilitaTorneio.habilitaTorneio,
                    nome: habilitaTorneio.nome,
                    data: habilitaTorneio.data
                }
                await knex.update(torneio).table('Torneio').where({id:id});
                return true;
            } catch(e){
                console.log(e);
                return false;
            }
        }
        return false;
    }

    async Update(id,idTipoTorneio,idFormato,habilitaTorneio,nome,data){
        var torneio = this.FindById(id);
        if(nome.trim().length == 0){
            return false;
        }        

        if(habilitaTorneio == undefined) {habilitaTorneio = 0} else {habilitaTorneio = 1}
        
        var editTorneio = {idTipoTorneio,idFormato,habilitaTorneio,nome,data};
        if (torneio != undefined){
            try{
                await knex.update(editTorneio).table('Torneio').where({id:id});
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

module.exports = new Torneio;