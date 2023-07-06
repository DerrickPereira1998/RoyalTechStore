const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ShoppingCart = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: "customers",
    required: true
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: true
  },
  data: {
    type: Date,
    default: Date.now()
  }
}, { collection: 'Shoppingcart', versionKey: false }
);

mongoose.model('shoppingCart', ShoppingCart);