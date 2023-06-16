const Deck = require('../Model/Deck');
const Jogador = require('../Model/Jogador');
const Arquetipo = require('../Model/Arquetipo');
const Formato = require('../Model/Formato');

const Reader = require('../ReadFile/Reader');
const Processor = require('../ReadFile/Processor');
var leitor = new Reader;
const upload = require('../ReadFile/Upload');
const diretorio = "./UploadFiles";
var fs  = require('fs');
const DeckImport = require('../Import/DeckImport');

class DeckImportController{
    async Index(req,res){

        /*var diretorio = '/UploadFiles';
        try{
            fs.unlink(diretorio + "/deck.csv",err => {
                if(err){
                    console.log("Deu erro ",err)
                } else {
                    console.log("Deletado");
                }
            });
        } catch(e){
            console.log(e);
            res.redirect("/home");
        }*/

        res.render("./Import/DeckImport");
    }

    async Upload(req,res){
        upload(req, res, function (err) {
            if (err) {
                return res.end("Something went wrong:(");
            }
        });

        var dados = await leitor.Read(diretorio + "/deck.csv");
        var dados = Processor.Process(dados);

        var validar = await  DeckImport.ValidaDados(dados.toString(),req.session.user.email); 
        
        var importou;
        if (validar == ""){
            DeckImport.Import(dados.toString(),req.session.user.email);
            console.log("Importou!!");
            importou = true;
        } else {
            console.log("Deu erro")
            importou = false;
            //res.send({validar});
        }

        var dados = 
            {
                importou: importou,
                validar: validar
            }

        
        res.render("./Import/ImportFinish",{dados});        
    }

    async ValidaArquivo(){

    }

}

module.exports = new DeckImportController();