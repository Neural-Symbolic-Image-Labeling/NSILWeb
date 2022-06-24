const { mongoose } = require('../../mongoose');

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  interpretation: [{
    type: String,
    required: true
  }],
});

const ImageSetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  images: [ImageSchema],
});

const ImageSet = mongoose.model('ImageSet', ImageSetSchema);

module.exports = {
  ImageSchema,
  ImageSetSchema,
  ImageSet
};