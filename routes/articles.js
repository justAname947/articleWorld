const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/Article');

//Load model
const article = require('../models/Article')

// GET add article
router.get('/addarticle', (req, res) =>{
    res.render('addarticle');
})

// POST add article
router.post('/addarticle', (req, res) =>{
    const {headline, articleContent } = req.body;
    const newArticle = new Article({
        headline, articleContent
    });
    newArticle.save().then(article => {
        req.flash('success', 'You have successfully added an article');
    }).catch(err => console.log(err));
    console.log(newArticle);
    res.send("success");
})

// GET article

router.get('/:id', async (req, res) => {
    
    await Article.findById(req.params.id, (err, article) => {
        if (err) throw err;
     res.render('articleview', {
         article
     })   
    })
})

module.exports = router;