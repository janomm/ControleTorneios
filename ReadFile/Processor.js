class Processor{
    static Process(data){
        //console.log("1-> " + data)
        var row = data.split("\r\n")

        //console.log("2-> " + row)

        var rows = [];

        row.forEach(r => {
            var arr = r.split(";")
            rows.push(arr)
        })
        
        //return rows;
        return row;

    }
}

module.exports = Processor;