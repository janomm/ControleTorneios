module.exports = function(req,res,next){
    if(req.session.root != undefined){
        next();
    } else {
        res.redirect("/");
    }
}
