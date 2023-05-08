const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Products = new Schema({
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  preco: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  nota: {
    type: Number,
    default: 0
  },
  categoria: {
    //EXEMPLO DE CRIAÇÃO DE CHAVES ESTRANGEIRAS
    type: Schema.Types.ObjectId,
    ref: "customer"
  },
  data: {
    type: Date,
    default: Date.now()
  }
}, { collection: 'Products', versionKey: false }
);

mongoose.model('products', Products);