const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const bcryptjs = require('bcryptjs');

const { authenticatedUser } = require('../config/auth.js');

// Load model
const User = require('../models/User')

// GET Register
router.get('/register', (req, res) => {
    res.render('register');
});

// POST Register
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;

    const errors = [];
    
    if(name.length < 4){
        errors.push({msg : "Name too short."})
    
    }
    
    if( password.length < 6 || password2.length < 6 ){
        errors.push({msg : "Passwords must be atleast 7 characters long."});
    }
    
    if(password !== password2){
        errors.push({msg : "Passwords do not match"});
    }
    
    if(errors.length >1){
        res.render('register',{
            errors,
            name,
            email,
        });
    }else{
        //check if email is registered
        User.findOne({email}).then(user =>{
            if(user){
                //registered
                errors.push({msg : " User already registered."})
                res.render('register',{
                    name,
                    email,
                    password
                });
                
            }else{  
                //save user
                const newUser = new User({
                    email,name,password
                })
                //hash password
                bcryptjs.genSalt(10, (err, salt)=>
                bcryptjs.hash(newUser.password, salt, (err, hashedPwd)=>{
                    if(err) throw err;
                    newUser.password = hashedPwd;
                    newUser.save().then(user =>{
                        req.flash('success_msg', 'You have successfully registered')
                    }).catch(err=>console.log(err));
                    res.render('login')
                }));


                
            }
        })
        
    }
    


})

// GET login
router.get('/login', (req, res) => {
    res.render('login');
});

//POST login
router.post('/login', (req, res, next) => {
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res, next);
});

module.exports = router;