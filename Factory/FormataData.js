
class FormataData{

    Short(data){
        const formatter = Intl.DateTimeFormat('pt-br',{
            dateStyle: 'short'
        })

        var ret = formatter.format(data).toString();

        ret = ret.split('/')[2] + "-" + ret.split('/')[1] + "-" + ret.split('/')[0];
        
        return ret;
    }

    Long(data){
        const formatter = Intl.DateTimeFormat('pt-br',{
            dateStyle: 'long'
        })
        
        return formatter.format(data);
    }

    Insert(data){
        const newData = data.split('/')[2] + "-" + data.split('/')[1] + "-" + data.split('/')[0];

        return newData.toString();
    }
}

module.exports = new FormataData;