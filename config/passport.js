const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// User model
const User = require('../models/User');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email', passwordField: "password"}, (email, password, done) => {
            // match user
            User.findOne({email:email})
            .then(user => {
                if(!user){
                    console.log("email does not exit");
                    return done(null, false, { message :'This email does not exist.'});
                }
                // match password
                bcryptjs.compare(password, user.password, (err, isMatched)=>{
                    if(err) throw err;
                    if(isMatched){
                        console.log('It went threw.')
                        return done(null, user);
                    }else{
                    console.log("incorrect password");
                    return done(null, false, { message : 'Incorrect password.'})
                }})
                
            })
            .catch(err => console.log(err));

        })
    );
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });
}
