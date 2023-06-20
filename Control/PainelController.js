

class PainelController{
    async CadastrosAdmin(req,res){
        res.render('./Painel/CadastrosAdmin');
    }

    async DecksJogadores(req,res){
        res.render('./Painel/DecksJogadores');
    }

}

module.exports = new PainelController;