const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const { authenticatedUser } = require('./config/auth');
const app = express();


// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

//Passport config
require('./config/passport')(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// URL Parser
app.use(express.urlencoded({extended: true}));

// Connect flash
app.use(flash());

//Global varibales
app.use(function (req, res, next) {
  res.locals.error = req.flash('error'); //this is where passport pushes errors...i think, i hope. im a believer
  res.locals.success = req.flash('success');
  res.locals.errors = req.flash('errors');
  res.locals.loginStatus = req.isAuthenticated();
  next();
});

// Mongo connection
const {MongoDbUrl} = require('./config/key');

mongoose.connect(MongoDbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Mongo database successfully connected"))
.catch(err => console.log(err));


// Express layouts middleware + setting EJS as view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');


// Routes
app.use('/users', require('./routes/users'));

app.get('/', (req, res)=>{
  res.redirect('/users/login');
})

app.get('/dashboard', authenticatedUser, (req, res)=>{
  res.render('dashboard', { 
    user : req.user
  });
})
const PORT = process.env.PORT | 3000
app.listen(3000, () => console.log(`Server started on port: ${PORT}`));