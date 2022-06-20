const { mongoose } = require('../../mongoose');

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = {
  ImageSchema,
  Image
};