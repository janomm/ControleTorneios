const TipoTorneio = require("../Model/TipoTorneio");

class TipoTorneioController{
    async Index(req,res){
        try{
            var tipoTorneios = await TipoTorneio.FindAll();
            res.render('./TipoTorneio/TipoTorneios',{tipoTorneios});
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async New(req,res){
        res.render("./TipoTorneio/TipoTorneiosNew");
    }

    async Save(req,res){
        var {nome} = req.body;
        try{
            await TipoTorneio.Create(nome);
            res.redirect("/tipoTorneios");
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Edit(req,res){
        var id = req.params.id;
        try{
            var tipoTorneio = await TipoTorneio.FindById(id);
            res.render('./TipoTorneio/TipoTorneiosEdit',{tipoTorneio});

        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Delete(req,res){
        var id = req.body.id;

        try{
            await TipoTorneio.Delete(id);
            var tipoTorneios = await TipoTorneio.FindAll();
            res.render('./TipoTorneio/TipoTorneios',{tipoTorneios});
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

}

module.exports = new TipoTorneioController;