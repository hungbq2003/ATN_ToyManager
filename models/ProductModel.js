const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema(
    {
        id: String,
        name: String,
        count: Number,
        price: Number,
        image: String,
        categories: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories'
        }
    }
)


const ProductModel = mongoose.model('products', ProductSchema);
module.exports = ProductModel;
