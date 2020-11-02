const { render } = require('ejs');
const express = require('express');
const router = express.Router();

// GET Register
router.get('/register', (req, res) => {
    res.render('register');
});

//POST Register
router.post('/register', (req, res) => {
    const { email, password, password2 } = req.body;
    const errors = [];

    if( password.length < 6 || password2.length < 6 ){
        errors.push({msg : "Passwords must be atleast 7 characters long."});
        console.log("password not long enough");

        res.render('register',{
            errors
        });
    }
    if(password !== password2){
        errors.push({msg : "Passwords do not match"});
        console.log("passwords dont match.");
        res.render('register',{
            errors
        });
        
    }

    res.send('success 3');

})

// GET login
router.get('/login', (req, res) => {
    res.render('login');
});

//POST login
router.post('/login', (req, res)=>{
    console.log(req.body.email);
    console.log(req.body.password);
    res.send('success');
})

module.exports = router;