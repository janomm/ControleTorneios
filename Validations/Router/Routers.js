const express = require('express');
const router = express.Router();

const RankingValidate = require('../Validate/RankingValidate');
const LoginValidate = require('../Validate/LoginValidate');
const TipoTorneioValidate = require('../Validate/TipoTorneioValidate');

router.get('/',(req,res)=>{
    res.send('inicio Rota');
});

//Login
router.post('/ValidateLogin',LoginValidate.ValidaLogin); //../Login/Login
router.post("/ValidaCriacaoUser",LoginValidate.ValidaCriacaoUser); // ../Jogador/LoginJogadorNew

//Ranking
router.post('/ValidateInsertEdit',RankingValidate.ValidateInsert); //../Raking/RankingsNew


/***************************************************************************************************/

//TipoTorneio
router.post("/ValidaDeletaTipoTorneio",TipoTorneioValidate.ValidaDelete); //../TipoTorneio/TipoTorneios
router.post("/ValidaInsert",TipoTorneioValidate.ValidaInsert); //../TipoTorneio/TipoTorneiosNew


module.exports = router;