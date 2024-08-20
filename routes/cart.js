const express = require('express');
const { isLoggedIn } = require('../middleware');
const Product = require('../models/Product');
const User = require('../models/User');
const router = express()
const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');


router.get('/user/cart',isLoggedIn, async (req,res)=>{
    let user = await User.findById(req.user._id).populate('cart')
    res.render('cart/cart', {user})
})

//Actually adding the product to the cart
router.post('/user/:productId/add',isLoggedIn, async (req,res)=>{
    let {productId} = req.params;
    let userId = req.user._id;
    let product = await Product.findById(productId)
    let user = await User.findById(userId);
    user.cart.push(product);
    user.save()
    res.redirect('/user/cart')
})



module.exports = router;