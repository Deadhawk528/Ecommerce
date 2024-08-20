const Product = require("../models/Product");
const { model, default: mongoose } = require('mongoose');


const showAllProducts = async (req,res)=>{
    try{
    let products = await Product.find().limit(100)
    console.log(products.length);
    res.render('products/index', {products})
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
}

const productForm = (req,res)=>{
    try{
    res.render('products/new')
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
}

const addNewProduct = async (req,res)=>{

    try{
    let {name, img, price, description} = req.body;
   await Product.create({name, img, price, description, author:req.user._id})
   req.flash('success', 'Product addedd successfully')
   res.redirect('/products')
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
}

const showOneProduct = async(req,res)=>{
    try{
    let {id} = req.params;
    let singleProduct = await Product.findById(id).populate('reviews')
    res.render('products/show', {singleProduct, msg: req.flash('msg')})
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
}

const editForm = async(req,res)=>{
    try{
    let {id} = req.params;
    let singleProduct = await Product.findById(id)
    res.render('products/edit', {singleProduct})
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
}

const saveEditData = async(req,res)=>{
    try{
    let {id} = req.params;
    let {name,img,price,description} = req.body
    await Product.findByIdAndUpdate(id, {name,img,price,description});
    req.flash('success', 'Product edited successfully')
   
    res.redirect(`/products/${id}`)
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
}

 const deleteProduct = async(req,res)=>{
    try{
    let {id} = req.params;
    const product = await Product.findById(id);
    // for(let id of product.reviews){
    //    await Review.findByIdAndDelete(id)
    // }
    await Product.findByIdAndDelete(id)
    req.flash('success', 'Product deleted successfully')
    res.redirect('/products')
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
}

module.exports = {showAllProducts, productForm, addNewProduct, showOneProduct, editForm, saveEditData, deleteProduct}