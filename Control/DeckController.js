const Deck = require('../Model/Deck');
const Jogador = require('../Model/Jogador');
const Arquetipo = require('../Model/Arquetipo');
const Formato = require('../Model/Formato');

class DeckController{
    async Index(req,res){
        try{
            var jogador = await Jogador.FindByEmail(req.session.user.email);
            var decks = await Deck.FindAll(jogador.id);
            res.render('./Deck/Decks',{decks});
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async New(re,res){
        try{
            var arquetipos = await Arquetipo.FindAll();
            var formatos = await Formato.FindAll();

            var dados = {
                arquetipos: arquetipos,
                formatos:formatos
            }

            res.render('./Deck/DecksNew',{dados});
        } catch(e){
            console.log(e);
            res.redirect('/logout');
        }
    }

    async Save(req,res){
        var jogador = await Jogador.FindByEmail(req.session.user.email);
        var {nome,idArquetipo,idFormato} = req.body;
        try{
            await Deck.Create(jogador.id,idArquetipo,nome,idFormato);
            res.redirect("/decks");
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Delete(req,res){
        var id = req.body.id;
        
        try{
            var ret = await Deck.Delete(id);
            var jogador = await Jogador.FindByEmail(req.session.user.email);
            var decks = await Deck.FindAll(jogador.id);
            res.render('./Deck/Decks',{decks});
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Edit(req,res){
        var id = req.params.id;
        try{            
            var arquetipos = await Arquetipo.FindAll();
            var formatos = await Formato.FindAll();
            var deck = await Deck.FindById(id);
            var dados = {
                arquetipos: arquetipos,
                formatos:formatos,
                deck:deck
            }

            res.render('./Deck/DecksEdit',{dados});
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async Update(req,res){
        var jogador = await Jogador.FindByEmail(req.session.user.email);
        var {id,nome,idArquetipo,idFormato} = req.body;
        try{
            await Deck.Update(id,jogador.id,idArquetipo,nome,idFormato);
            res.redirect("/decks");
        } catch(e){
            console.log(e);
            res.redirect("/logout");
        }
    }

    async ListaDeck(req,res){
        console.log("listadeck")
        var id = req.params.id;
        //var jogador = await Jogador.FindByEmail(req.session.user.email);
        var deck = await Deck.FindById(id);

        req.render('/Deck/ListaDeck',{deck});

    }
}

module.exports = new DeckController();