var express = require('express');
const customerModel = require('../models/CustomerModel');
var router = express.Router();

//READ Feature, must use "async" and "await" keywords
router.get('/', async (req, res) => {
    var customerList = await customerModel.find({});
    res.render('customer/index', { customerList });
});

//DELETE Feature
router.get('/delete/:id', async (req, res) => {

    let id = req.params.id;
    await customerModel.findByIdAndDelete(id);
    res.redirect('/customer');
 })
 
 router.get('/deleteall', async (req, res) => {
   
    await customerModel.deleteMany();
    res.redirect('/customer');
 })
 
 //Step 1: Render "Add customer" form. Used for user to input data
 router.get('/add', async (req, res) => {
    res.render('customer/add');
 })
 
 //Step 2: Get input data from the form, then add data to database
 router.post('/add', async (req, res) => {
    var customer = req.body;
    console.log(customer)
    await customerModel.create(customer);
    res.redirect('/customer');
 })
 
 router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var customer = await customerModel.findById(id);
    console.log(customer)
    res.render('customer/edit', { customer });
 })
 
 router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var customer = req.body;
    await customerModel.findByIdAndUpdate(id,customer);
    res.redirect('/customer');
 })
 
 //Show customer detail
 router.get('/detail/:id', async (req, res) => {
    let id = req.params.id;
    var customer = await customerModel.findById(id);
    res.render('customer/detail', { customer });
 })
 
 
 //Search by customer name
 router.post('/search', async (req, res) => {
    let keyword = req.body.keyword;
    let customers = await customerModel.find({ name: new RegExp(keyword, "i") });
    res.render('customer/index', { customerList : customers });
 })
 
 //Sort by customer ID (ascending)
 router.get('/sortid/asc', async (req, res) => {
    let customerList = await customerModel.find().sort({ name: 1 });
    res.render('customer/index', { customerList });
 })
 
 //Sort by customer ID (Descending)
 router.get('/sortid/desc', async (req, res) => {
    let customerList = await customerModel.find().sort({ name: -1 });
    res.render('customer/index', { customerList });
 })
 
 //Filter customer by male gender
 router.get('/male', async (req, res) => {
    let customerList = await customerModel.find({ gender : "male"});
    res.render('customer/index', { customerList });
 })
 
 //Filter customer by female gender
 router.get('/female', async (req, res) => {
    let customerList = await customerModel.find({ gender: "female" });
    res.render('customer/index', { customerList });
 })
 
 module.exports = router;