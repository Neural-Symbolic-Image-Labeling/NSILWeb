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
  interpretation: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const ImageSetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  images: [mongoose.Types.ObjectId],
  worldDict: {
    type: mongoose.Schema.Types.Mixed,
  }
});

const Image = mongoose.model('Image', ImageSchema);
const ImageSet = mongoose.model('ImageSet', ImageSetSchema);

module.exports = {
  ImageSchema,
  ImageSetSchema,
  ImageSet,
  Image
};