const knex = require("../Database/connection");
const FormataData = require("../Factory/FormataData");

/*const lstFases = [
                    { id: 0, desc: "Cancelado" },
                    { id: 1, desc: "Criação" },
                    { id: 2, desc: "Divulgação" },
                    { id: 3, desc: "Inscrição Interna" },
                    { id: 4, desc: "Inserir Resultados" },
                    { id: 5, desc: "Final" }
                ]; */
//const lstFases = [ "Cancelado", "Criação", "Divulgação", "Inscrição Interna", "Inserir Resultados", "Final" ];

class Torneio{
    async Create(idTipoTorneio,idFormato,nome,data){
        try{
            if(idTipoTorneio != undefined){
                await knex.insert({idTipoTorneio,idFormato,nome,data}).table('Torneio');
                return true;
            }
        } catch(e){
            console.log(e);
            return false;
        }
    }

    async FindById(id,fData){
        try{
            var torneio = await knex.select(['torneio.*','TipoTorneio.nome as TipoTorneioNome','Formato.nome as FormatoNome'
                ,knex.raw("CASE WHEN torneio.fase = 1 THEN 'Criação' WHEN torneio.fase = 2 THEN 'Divulgação' WHEN torneio.fase = 3 THEN 'Inscrição Interna' WHEN torneio.fase = 4 THEN 'Inserir Resultados' WHEN torneio.fase = 5 THEN 'Final' ELSE 'Cancelado' END AS descFase")])
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
            });
            return torneio[0];
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async FindTorneios(){
        try{
            var result = await knex.select(['torneio.*','TipoTorneio.nome as TipoTorneioNome','Formato.nome as FormatoNome'
                ,knex.raw("CASE WHEN torneio.fase = 1 THEN 'Criação' WHEN torneio.fase = 2 THEN 'Divulgação' WHEN torneio.fase = 3 THEN 'Inscrição Interna' WHEN torneio.fase = 4 THEN 'Inserir Resultados' WHEN torneio.fase = 5 THEN 'Final' ELSE 'Cancelado' END AS descFase")
                ])
                .table("Torneio")
                .innerJoin("TipoTorneio","TipoTorneio.id","Torneio.idTipoTorneio")
                .innerJoin("Formato","Formato.id","Torneio.idFormato")
                //.where('torneio.fase',habilitaTorneio);
            
            result.forEach(function(torneio, i) {
                torneio.data = FormataData.Long(torneio.data);
            });
            return result;
        } catch(e){
            console.log(e);
            return undefined;
        }
    }

    async FindAll(){
        try{
            var result = await knex.select(['torneio.*','TipoTorneio.nome as TipoTorneioNome','Formato.nome as FormatoNome'
                ,knex.raw("CASE WHEN torneio.fase = 1 THEN 'Criação' WHEN torneio.fase = 2 THEN 'Divulgação' WHEN torneio.fase = 3 THEN 'Inscrição Interna' WHEN torneio.fase = 4 THEN 'Inserir Resultados' WHEN torneio.fase = 5 THEN 'Final' ELSE 'Cancelado' END AS descFase")
                ])
                .table("Torneio")
                .innerJoin("TipoTorneio","TipoTorneio.id","Torneio.idTipoTorneio")
                .innerJoin("Formato","Formato.id","Torneio.idFormato")
            
            result.forEach(function(torneio, i) {
                torneio.data = FormataData.Long(torneio.data);
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

    /*async Enable(id){
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
    }*/

    async Cancelar(id){
        try{
            var torneio = await this.FindById(id);
            var editTorneio = {
                id: torneio.id,
                idTipoTorneio: torneio.idTipoTorneio,
                idFormato: torneio.idFormato,
                fase:0,
                nome: torneio.nome,
                data: torneio.data
            }
            await knex.update(editTorneio).table('Torneio').where({id:id});
            return true;
        } catch(e){
            console.log(e);
            return false;
        }
    }

    async Update(id,idTipoTorneio,idFormato,nome,data,fase){
        var torneio = this.FindById(id);
        if(nome.trim().length == 0){
            return false;
        }        

        var editTorneio = {idTipoTorneio,idFormato,nome,data,fase};
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