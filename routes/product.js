var express = require('express');
const productModel = require('../models/ProductModel');
var router = express.Router();
const categoryModel = require('../models/CategoryModel');

//READ feature
//Importance: Must use "async" + await" keywords
router.get('/', async (req, res) => {
   const productList = await productModel.find({}).populate('categories');
   res.render('product/index', { productList });
});

//DELETE feature
router.get('/delete/:id', async (req, res) => {
   let id = req.params.id;
   await productModel.findByIdAndDelete(id);
   res.redirect('/product');
})

router.get('/deleteall', async (req, res) => {
   await productModel.deleteMany();
   res.redirect('/product');
})

//step 1: render "Add product" form for user to input data
router.get('/add', async (req, res) => {   
   var categories = await categoryModel.find({});
   res.render('product/add',{ categories });
})

//step 2: get input data from form and add data to database
router.post('/add', async (req, res) => {
   var product = req.body;
   console.log(product);
   await productModel.create(product);
   res.redirect('/product');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var product = await productModel.findById(id);
   res.render('product/edit', { product });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var product = req.body;
   await productModel.findByIdAndUpdate(id,product);
   res.redirect('/product');
})


//search by product name
router.post('/search', async (req, res) => {
   let keyword = req.body.keyword;
   let products = await productModel.find({ name: new RegExp(keyword, "i") }).populate('categories');
   res.render('product/index', { productList : products });
})

//sort by product id ascending
router.get('/sortid/asc', async (req, res) => {
   let productList = await productModel.find().sort({ name: 1 }).populate('categories');
   res.render('product/index', { productList });
})

//sort by product id descending
router.get('/sortid/desc', async (req, res) => {
   let productList = await productModel.find().sort({ name: -1 }).populate('categories');
   res.render('product/index', { productList });
})

module.exports = router;
