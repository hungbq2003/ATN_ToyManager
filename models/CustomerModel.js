//Declare mongoose
var mongoose = require('mongoose');
//Declare schema (for table design/structure)
var CustomerSchema = mongoose.Schema(
   {
      id: String,
      name: String,
      age: Number,   //integer
      gender: String,
      image: String
   }
);
//Declare model (to be used in routes, as "controllers")
var CustomerModel = mongoose.model("customers", CustomerSchema);  //students: collection name
//Note: in case collection name is single form (without "s" at the end)
//var StudentModel = mongoose.model("customer", CustomerSchema, "customer");
//export module
module.exports = CustomerModel;

