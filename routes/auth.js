const express = require('express');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router();

//to show the form
router.get('/register', (req,res)=>{
    res.render('auth/signup')
})

//to actually register the user
router.post('/register', async(req,res)=>{
    const {username, email, password, role} = req.body;
    const user = new User({email,username,role});
    const newUser = await User.register(user, password);
    // res.redirect('/login');
    req.login(newUser,function(err){
        if(err){
            return next(err)
        }
        req.flash('success', 'welcome, you are registered successfully')
        return res.redirect('/products')
    })
})

//To get Login Form
router.get('/login', (req,res)=>{
    res.render('auth/login')
})

//To actually login via DB, passport.authenticate is a middleware here
router.post('/login',passport.authenticate('local', { 
            failureRedirect: '/login' 
        }), (req,res)=>{
            req.flash('success', 'Welcome Back');
            res.redirect('/products')
        })

// To logout from site
router.get('/logout', (req,res)=>{
    ()=>{
        req.logOut();
    }
    req.flash('success', 'Goodbye, See you again');
    res.redirect('/login')
})

module.exports = router