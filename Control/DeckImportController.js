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
        
        if (validar == ""){
            DeckImport.Import(dados.toString(),req.session.user.email);
            res.end("Importou!!");
        } else {
            console.log("Deu erro")
            res.send({validar});

        }
        
        /*fs.readdir('./UploadFiles',(err, files) => {
            if(err){
                console.log("Diretório não encontrado")
                return;
            }

            /*files.forEach(file => {
                console.log("--> " + file);
            })* /
        })

        fs.unlink(diretorio + "/teste.csv",err => {
            if(err){
                console.log("Deu erro")
            }
            console.log("Deletado");
        });*/
        

        //res.end("Upload completed.");
    }


    async ValidaArquivo(){

    }

}

module.exports = new DeckImportController();