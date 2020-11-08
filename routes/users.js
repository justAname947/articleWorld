const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const bcryptjs = require('bcryptjs');

const { authenticatedUser, mustNotBeAuthed } = require('../config/auth.js');

// Load model
const User = require('../models/User')

// GET Register
router.get('/register', mustNotBeAuthed, (req, res) => {
    res.render('register');
});

// POST Register
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;

    const errors = [];
    
    if(name.length < 4){
        errors.push({msg : "Name must be atleast 4 letters."})
    
    }
    
    if( password.length < 6 || password2.length < 6 ){
        errors.push({msg : "Passwords must be atleast 6 characters long."});
    }
    
    if(password !== password2){
        errors.push({msg : "Passwords do not match"});
    }
    
    if(errors.length >= 1 ){
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
                    errors,
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
router.get('/login', mustNotBeAuthed, (req, res) => {
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

router.get('/logout', (req, res)=>{
    req.logout();
    req.flash('success', 'You have successfully logged out');
    res.redirect('login')
});
module.exports = router;

