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

module.exports = router;