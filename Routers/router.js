const express = require("express");
const app = express();
const router = express.Router();

const TipoTorneioController = require("../Control/TipoTorneioController");
const JogadorController = require("../Control/JogadorController");
const TorneioController = require("../Control/TorneioController");
const FormatoController = require("../Control/FormatoController");
const UserController = require('../Control/UserController');
const PlayerController = require("../Control/PlayerController");
const RankingController = require('../Control/RankingController');
const ArquetipoController = require("../Control/ArquetipoController");
const DeckController = require('../Control/DeckController');
const DeckImportController = require("../Control/DeckImportController");

const Auth = require('../Middleware/Auth');
const Root = require('../Middleware/Root');


router.get("/",(req,res) => {
    res.render('index');
});

//Login
router.get('/NewJogador',JogadorController.NewJogador);
router.post('/jogadores/newSave',UserController.NewJogador);
router.get("/login",UserController.Index);
router.post("/authenticate",UserController.Auth);
router.get('/logout',UserController.Logout);

//Jogador
router.get("/jogadores",Root,JogadorController.Index); 
router.get("/jogadores/new",Root,JogadorController.New);
router.get("/jogadores/edit/:id",Root,JogadorController.Edit);
router.post("/jogadores/update",Root,JogadorController.Update);
router.post("/jogadores/save",Root,JogadorController.Save);
router.post("/jogadores/delete",Root,JogadorController.Delete);

//Torneio
router.get("/torneios",Root,TorneioController.Index); 
router.get("/torneios/new",Root,TorneioController.New);
router.get("/torneios/edit/:id",Root,TorneioController.Edit);
router.get('/torneios/enable/:id',Root,TorneioController.Enable);
router.post("/torneios/update",Root,TorneioController.Update);
router.post("/torneios/save",Root,TorneioController.Save);
router.post("/torneios/delete",Root,TorneioController.Delete);

router.get("/torneios/inscritos/:id",Root,TorneioController.Inscritos);
//router.post('/torneios/atualizarJogador/:id',Root,PlayerController.Update);
router.post("/torneios/inscrito/delete",Root,PlayerController.DeleteInscrito);
router.post("/torneios/inscrito/atualiza",Root,PlayerController.AtualizaInscrito);


//TipoTorneio
router.get("/tipoTorneios",Root,TipoTorneioController.Index); 
router.get("/tipoTorneios/new",Root,TipoTorneioController.New);
router.post("/tipoTorneios/save",Root,TipoTorneioController.Save);
router.post("/tipoTorneios/delete",Root,TipoTorneioController.Delete);

//Formatos
router.get("/formatos",Root,FormatoController.Index); 
router.get("/formatos/new",Root,FormatoController.New);
router.post("/formatos/save",Root,FormatoController.Save);
router.post("/formatos/delete",Root,FormatoController.Delete);

//Arquétipos
router.get("/arquetipos",Root,ArquetipoController.Index); 
router.get("/arquetipos/new",Root,ArquetipoController.New);
router.post("/arquetipos/save",Root,ArquetipoController.Save);
router.post("/arquetipos/delete",Root,ArquetipoController.Delete);

//Rankin
router.get('/rankings',Root,RankingController.Index);
router.get('/rankings/new',Root,RankingController.New);
router.get('/rankings/view/:id',Root,RankingController.View);
router.post('/rankings/save',Root,RankingController.Save);
router.post('/rankings/delete',Root,RankingController.Delete);

// Rotas autenticadas

//Players
router.get("/perfil",Auth,PlayerController.Perfil);
router.get("/home",Auth,PlayerController.Home);
router.get("/torneios/detalhe/:id",Auth,TorneioController.Detalhe);
router.get("/torneios/inscrever/:id",Auth,PlayerController.Inscrever);
router.get("/torneios/cancelar/:id",Auth,PlayerController.Cancelar);
router.get("/torneios/old",Auth,PlayerController.Anteriores);
router.get("/torneios/classificacao/:id",Auth,PlayerController.Classificacao);

//Decks
router.get('/decks',Auth,DeckController.Index);
router.get('/decks/new',Auth,DeckController.New);
router.get("/decks/edit/:id",Auth,DeckController.Edit);
router.post('/decks/save',Auth,DeckController.Save);
router.post("/decks/delete",Auth,DeckController.Delete);
router.post("/decks/update",Auth,DeckController.Update);

router.get("/importDeck",Auth,DeckImportController.Index);
router.post("/import/deck",Auth,DeckImportController.Upload);


module.exports = router;