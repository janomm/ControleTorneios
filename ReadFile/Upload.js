var multer  = require('multer');
var fs  = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = "./UploadFiles";
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, "deck.csv");
    }
});

var upload = multer({storage: storage}).array('files', 12);

module.exports = upload;
