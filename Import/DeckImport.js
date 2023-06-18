const Reader = require('../ReadFile/Reader')
const Processor = require('../ReadFile/Processor');

const Deck = require('../Model/Deck');
const Arquetipo = require('../Model/Arquetipo');
const Jogador = require('../Model/Jogador');
const Formato = require('../Model/Formato');


class DeckImport{
    async ValidaDados(dados,email){
        var jogador = await Jogador.FindByEmail(email);
        var result = [];

        for(var x = 0; x < dados.split(",").length; x++){
            var linha = dados.split(",")[x];
                
            var {arquetipoObj,formatoObj,deckObj} = "" ;
            
            var i = x + 1;
            var nome = linha.split(';')[0];
            var arquetipo = linha.split(';')[1];
            var formato = linha.split(';')[2];

            
            if(arquetipo == "" || arquetipo == undefined){
                var e = {erro:"Arquétipo do deck não informado na linha " + i + "."};
                result.push(e);
            }

            if(formato == "" || formato == undefined){
                var e = {"erro":"Formato do deck não informado na linha " + i + "."};
                result.push(e);
            }

            if(nome == "" || nome == undefined){
                var e = {erro:"Nome do deck não informado na linha " + i + "."};
                result.push(e);
            }

            if(arquetipo != "" && formato != "" && nome != ""){
                arquetipoObj = await Arquetipo.FindByNome(arquetipo);
                if(arquetipoObj == undefined){
                    var e = {"erro":"Arquétipo informando não existe na linha " + i + "."};
                    result.push(e);
                }

                formatoObj = await Formato.FindByNome(formato);
                if(formatoObj == undefined){
                    var e = {"erro":"Formato informando não existe na linha " + i + "."};
                    result.push(e);
                }

                if(arquetipoObj != undefined && formatoObj != undefined ){
                    deckObj = await Deck.FindDeck(jogador.id,arquetipoObj.id,nome,formatoObj.id);
                    if(deckObj != undefined && deckObj != ""){
                        var e = {"erro":"Deck informado na linha " + i + " já cadastrado."};
                        result.push(e);
                    }
                }
            }
        }
        
        return result;
    }

    async Import(dados,email){
        var jogador = await Jogador.FindByEmail(email);

       for(var x = 0; x < dados.split(",").length; x++){
            var linha = dados.split(",")[x];

            var nome = linha.split(';')[0];
            var arquetipo = linha.split(';')[1];
            var formato = linha.split(';')[2];

            var arquetipo = await Arquetipo.FindByNome(arquetipo);
            var formato = await Formato.FindByNome(formato);

            try{
                var result = await Deck.Create(jogador.id,arquetipo.id,nome,formato.id);

            } catch(e){
                console.log(e)
                return false;
            }

        }

        return true;
        
        
    }
}

module.exports = new DeckImport;

