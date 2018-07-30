const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  unit: String,
  price_per_unit: Number,
  date_added: { type: Date, default: Date.now },
  date_warn: { type: Date},
  date_expire: { type: Date},
});

module.exports = mongoose.model('FoodItem', FoodItemSchema);
