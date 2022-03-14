const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    id: Number,
    brand: String,
    description: String,
    image: String,
    price: Number
}, {
    collection: 'products'
});

var Products = mongoose.model("Products", productSchema, "products");

module.exports = Products;