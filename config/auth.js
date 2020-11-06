module.exports = {
    authenticatedUser : function (req,res,next){
        if(req.isAuthenticated()){
            next();
        } else{
            res.redirect("/users/login");
        }
      }
}
  