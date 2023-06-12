const Arquetipo = require("../Model/Arquetipo");

class ArquetipoController{
    async Index(req,res){
        try{
            var arquetipos = await Arquetipo.FindAll();
            res.render('./Arquetipo/Arquetipos',{arquetipos});
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async New(req,res){
        res.render("./Arquetipo/ArquetiposNew");
    }

    async Save(req,res){
        var {nome} = req.body;
        try{
            await Arquetipo.Create(nome);
            res.redirect("/arquetipos");
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Edit(req,res){
        var id = req.params.id;
        try{
            var arquetipo = await Arquetipo.FindById(id);
            res.render('./Arquetipo/ArquetiposEdit',{arquetipo});

        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Delete(req,res){
        var id = req.body.id;

        try{
            await Arquetipo.Delete(id);
            var arquetipos = await Arquetipo.FindAll();
            res.render('./Arquetipo/Arquetipos',{arquetipos});
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

}

module.exports = new ArquetipoController();