const express = require('express');
const router = express.Router();

// GET Register
router.get('/register', (req, res) => {
    res.render('register');
});

//POST Register
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
    }
    


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