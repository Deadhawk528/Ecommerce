const exp = require("constants");
const express = require("express");
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const seedDB = require("./seed");
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/User')

//connecting Mongo DB via mongoose
mongoose.connect('mongodb+srv://harshitmalhotra28:w3fPMiie6iG8lo9x@cluster0.wepzv.mongodb.net/ecommerce')
.then(()=>{
    console.log("DB connected");
})
.catch((err)=>{
    console.log(err)
})
const  productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')
const likeRoutes = require('./routes/api/productapi')

let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized:true,
    cookie: {
        httpOnly: true,
        expires:Date.now() + 24*7*60*60*1000,
        maxAge:24*7*60*60*1000
    }
}

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public'))) //static folders
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'));
app.use(flash());
app.use(session(configSession));

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next()
})


//Passport
passport.use(new LocalStrategy(User.authenticate()));
  

//seeding Database
// seedDB() 

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(likeRoutes);

app.get('/', (req,res)=>{
    res.render('home')
})

app.get('*', (req,res)=>{
    res.sendFile(__dirname + '/404.html')
})


let PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`Server connected at ${PORT}`)
})

