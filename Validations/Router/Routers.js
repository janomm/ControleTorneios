const express = require('express');
const router = express.Router();

const RankingValidate = require('../Validate/RankingValidate');
const LoginValidate = require('../Validate/LoginValidate');
const TipoTorneioValidate = require('../Validate/TipoTorneioValidate');
const FormatoValidate = require('../Validate/FormatoValidate');
const ArquetipoValidate = require('../Validate/ArquetipoValidate');
const TorneioValidate = require('../Validate/TorneioValidate')

router.get('/',(req,res)=>{
    res.send('inicio Rota');
});

//Login
router.post('/ValidateLogin',LoginValidate.ValidaLogin); //../Login/Login
router.post("/ValidaCriacaoUser",LoginValidate.ValidaCriacaoUser); // ../Jogador/LoginJogadorNew

//Ranking
router.post('/ValidateInsertEdit',RankingValidate.ValidateInsert); //../Raking/RankingsNew


router.post('/ValidaInsercaoResultados',TorneioValidate.ValidaInsercaoResultados); //../Torneio/InserirResultados

/***************************************************************************************************/

//TipoTorneio
router.post("/ValidaDeletaTipoTorneio",TipoTorneioValidate.ValidaDelete); //../TipoTorneio/TipoTorneios
router.post("/ValidaInsert",TipoTorneioValidate.ValidaInsert); //../TipoTorneio/TipoTorneiosNew

//Formato
router.post("/ValidaInsertFormato",FormatoValidate.ValidaInsert); //../Formato/FormatosNew
router.post("/ValidaDeleteFormato",FormatoValidate.ValidaDelete); //../Formato/Formatos

//Arquétipo
router.post("/ValidaInsertArquetipo",ArquetipoValidate.ValidaInsert); //../Arquetipo/ArquetipoNew
router.post("/ValidaDeleteArquetipo",ArquetipoValidate.ValidaDelete); //../Arquetipo/Arquetipo



module.exports = router;