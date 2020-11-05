module.exports = {
    authenticatedUser : function (req,res,next){
        if(req.isAuthenticated()){
            //req.isAuthenticated() will return true if user is logged in
            console.log("is authed"); // testing purposes
            next();
        } else{
            console.log("isnt authed");
            res.redirect("/users/login");
        }
      }
}
  