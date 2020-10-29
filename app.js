const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');


// Express layouts middleware + setting EJS as view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('welcome');
});

const PORT = process.env.PORT | 3000
app.listen(3000, () => console.log(`Server started on port: ${PORT}`));