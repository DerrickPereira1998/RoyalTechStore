const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Orders = new Schema({
  customer_id: {
    //EXEMPLO DE CRIAÇÃO DE CHAVES ESTRANGEIRAS
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
}, { collection: 'Orders', versionKey: false }
);

mongoose.model('orders', Orders);