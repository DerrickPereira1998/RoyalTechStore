const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Products = new Schema({
  imagem: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  preco: {
    type: String,
    required: true
  },
  user_id: {
    //EXEMPLO DE CRIAÇÃO DE CHAVES ESTRANGEIRAS
    type: Schema.Types.ObjectId,
    ref: "customers",
    required: true
  },
  data: {
    type: Date,
    default: Date.now()
  }
}, { collection: 'Products', versionKey: false }
);

mongoose.model('products', Products);