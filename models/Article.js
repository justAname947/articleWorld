const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({

    headline: {
        type: String,
        required: true
    },
    articleContent: {
        type: String,
        required: true
    }


}, {timestamps: {}});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
