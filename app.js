const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();


// Mongo connection
const {MongoDbUrl} = require('./config/key');
mongoose.connect(MongoDbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Mongo database successfully connected"))
.catch(err => console.log(err));


// Express layouts middleware + setting EJS as view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// URL Parser
app.use(express.urlencoded({extended: true}));

// Routes
app.get('/', (req, res) => {
    res.render('welcome');
});

app.post('/users/login', (req, res)=>{
    console.log(req.body.email);
    console.log(req.body.password);
    res.send('success');
})

const PORT = process.env.PORT | 3000
app.listen(3000, () => console.log(`Server started on port: ${PORT}`));