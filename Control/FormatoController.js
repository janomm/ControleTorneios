const Formato = require("../Model/Formato");

class FormatoController{
    async Index(req,res){
        try{
            var formatos = await Formato.FindAll();
            res.render('./Formato/Formatos',{formatos});
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async New(req,res){
        res.render("./Formato/FormatosNew");
    }

    async Save(req,res){
        var {nome} = req.body;
        try{
            await Formato.Create(nome);
            res.redirect("/formatos");
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Edit(req,res){
        var id = req.params.id;
        try{
            var formato = await Formato.FindById(id);
            res.render('./Formato/FormatosEdit',{formato});

        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Delete(req,res){
        var id = req.body.id;

        try{
            await Formato.Delete(id);
            var formatos = await Formatos.FindAll();
            res.render('./Formato/Formatos',{formatos});
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

}

module.exports = new FormatoController;