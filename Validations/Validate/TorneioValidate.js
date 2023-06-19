const Torneio = require('../Model/Torneio');

class TorneioValidate{
    async ValidaInsercaoResultados(req,res){
        var {lstPosicao} = req.body;
        
        const lstOrdenado = qs(lstPosicao);
        var erro = false;
        
        for(var i = 0 ; i < lstOrdenado.length; i++){
            if(i + 1 < lstOrdenado.length ){
                if(lstOrdenado[i] == lstOrdenado[i+1]){
                    erro = true;
                }
            }
        }

        if(erro){
            res.status(200);
            res.json({err: "Posições erradas."});
            return
        }
        

        res.status(200);
        res.json({});
        return
    }

    qs(vet) {
        quickSort(vet, 0, vet.length - 1);
        return vet;
    }

    quickSort(vet, ini, fim){
        var i = ini;
        var f = fim;
        var m = Math.floor((i + f)/2);

        while(i < f)
        {
            while(vet[i] < vet[m])
                i++;

            while(vet[f] > vet[m])
                f--;

            if(i <= f)
            {
                var temp = vet[i];
                vet[i] = vet[f];
                vet[f] = temp;
                i++;
                f--;
            }
        }

        if(f > ini)
            quickSort(vet, ini, f);

        if(i < fim)
            quickSort(vet, i, fim);
    }
}

module.exports = new TorneioValidate;