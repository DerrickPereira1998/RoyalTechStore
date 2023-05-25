const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Image = new Schema({
  myFile: {
    type: String,
    required: true,
  }
}, { collection: 'Image', versionKey: false }
);

mongoose.model('image', Image);