var express = require('express');
const productModel = require('../models/ProductModel');
var router = express.Router();
const categoryModel = require('../models/CategoryModel');

router.get('/', async (req, res) => {
  var productList = await productModel.find({});
  var categories = await categoryModel.find({});
  res.render('index', { productList,categories });
});

router.get('/filter/:id',async (req,res) => {
  var id = req.params.id;
  var productList = await productModel.find({categories:id})
  var categories = await categoryModel.find({});
  res.render('index', { productList,categories });
})

module.exports = router;
