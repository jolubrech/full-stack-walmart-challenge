const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discountsSchema = new Schema({
    brand: String,
    threshold: Number,
    discount: Number
});

var Discounts = mongoose.model('Discounts', discountsSchema, 'discounts');

module.exports = Discounts;