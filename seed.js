const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name:"Iphone 14 Pro max",
        img:"https://images.unsplash.com/photo-1705305835960-3271b7e9ae9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price:130000,
        description:"Very costly aukaat ke bahar"
    },
    {
        name:"Macbook M2 Pro",
        img:"https://images.unsplash.com/photo-1600262300216-f531931b5ab9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price:250000,
        description:"Ye toh bilkul aukat ke bahar"
    },
    {
        name:"Airpods Pro",
        img:"https://images.unsplash.com/photo-1525825691042-e14d9042fc70?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price:20000,
        description:"Ye aukaat mei hai"
    }, 
    {
        name:"IWATCH Series 9",
        img:"https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price:90000,
        description:"Bohot Mehngi hai"
    },
    {
        name:"Apple Car",
        img:"https://plus.unsplash.com/premium_photo-1678281888592-8ad623bb39e9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price:10000000,
        description:"Sapno mei lena"
    }
]

async function seedDB(){
    await Product.insertMany(products)
    console.log("Data seeded successfully")
}

module.exports = seedDB;