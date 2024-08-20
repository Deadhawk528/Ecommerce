const { equal } = require('joi');
const Product = require('./models/Product');
const {productSchema, reviewSchema, userSchema} = require('./schema');

const validateProduct = (req,res,next)=>{
    const {name, img, price, description} = req.body;
    const {error} = productSchema.validate({name, img, price, description});
    if(error){
        return res.render('error')
    }
    next();
}

const validateReview = (req,res,next)=>{
    const {rating,comment} = req.body;
    const {error} = reviewSchema.validate({rating,comment});
    if(error){
        return res.render('error')
    }
    next();
}

const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error', "Please Login first")
        return res.redirect('/login')
    }
    next();
}

const isSeller = (req,res,next)=>{
    if(!req.user.role){
        req.flash('error', "You do not have the permission to do that")
        return res.redirect('/products')
    }
    else if(req.user.role !== 'seller'){
        req.flash('error', "You do not have the permission to do that")
        return res.redirect('/products')
    }
    next();
}

const isProductAuthor = async (req,res,next)=>{
    let {id} = req.params; // product Id
   const product = await Product.findById(id) // Entire Product
   if(!product.author.equals(req.user._id) ){
    req.flash('error', "You are not authorized to delete")
    return res.redirect('/products')
   }
   next();
}


module.exports = {validateProduct, validateReview, isLoggedIn, isSeller, isProductAuthor}