const Deck = require('../Model/Deck');
const Jogador = require('../Model/Jogador');
const Arquetipo = require('../Model/Arquetipo');
const Formato = require('../Model/Formato');

const upload = require('../ReadFile/Upload');

class DeckImportController{
    async Index(req,res){
        res.render("./Import/DeckImport");
    }

    async Upload(req,res){
        upload(req, res, function (err) {
            if (err) {
                return res.end("Something went wrong:(");
            }
            res.end("Upload completed.");
        });
    }

}

module.exports = new DeckImportController();