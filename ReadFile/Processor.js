class Processor{
    static Process(data){
        var row = data.split("\r\n")

        var rows = [];

        row.forEach(r => {
            var arr = r.split(";")
            rows.push(arr)
        })
        
        return rows;

    }
}

module.exports = Processor;