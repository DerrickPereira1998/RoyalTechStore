const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Customers = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
}, { collection: 'Customers', versionKey: false }
);

mongoose.model('customers', Customers);