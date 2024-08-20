const express = require('express');
const Product = require('../models/Product');
const { model, default: mongoose } = require('mongoose');
const Review = require('../models/Review');
const router = express.Router() //mini instance
const {validateProduct, isLoggedIn, isSeller, isProductAuthor} = require('../middleware');
const{showAllProducts, productForm, addNewProduct, showOneProduct, editForm, saveEditData, deleteProduct} = require('../controllers/product')

//TO show all the products
router.get('/products', showAllProducts)

//To show the form for new product

router.get('/product/new',isLoggedIn,productForm )

//Creating a New Product
router.post('/products', validateProduct, isLoggedIn, isSeller, addNewProduct)

//Showing a particular Product
router.get('/products/:id',isLoggedIn,showOneProduct )

//Form to edit the product
router.get('/products/:id/edit',isLoggedIn, editForm )

//To Update Data in DB
router.patch('/products/:id',validateProduct,isLoggedIn, saveEditData )
//to delete a product

router.delete('/product/:id',isLoggedIn,isProductAuthor,deleteProduct )

module.exports = router;