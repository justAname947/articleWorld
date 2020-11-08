module.exports = {
    authenticatedUser : function (req,res,next){
        if(req.isAuthenticated()){
            next();
        } else{
            req.flash('error', 'Please login to view this page.');
            res.redirect("/users/login");
        }
      },
      mustNotBeAuthed : function (req, res, next){
        if(!req.isAuthenticated()){
            next();
        } else{
            req.flash('error', 'You are already logged in');
            res.redirect("/dashboard");
        }
      }
}
  