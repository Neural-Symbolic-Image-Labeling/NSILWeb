const { mongoose } = require('../../mongoose');

const ImageMetaDataSchema = new mongoose.Schema({
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
    default: "unlabeled",
  },
  name: {
    type: String,
    required: true,
    default: "image",
  },
  canvas: {
    type: String,
    get: function (data) { 
      try {
        return JSON.parse(data);
      } catch (e) { 
        return data;
      }
    },
    set: function (data) { 
      return JSON.stringify(data);
    }
  },
  manual: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const StatisticsSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  unlabeled: {
    type: Number,
    required: true,
    default: 0,
  },
  manual: {
    type: Number,
    required: true,
    default: 0,
  },
  userChecked: {
    type: Number,
    required: true,
    default: 0,
  },
  autoLabeled: {
    type: Number,
    required: true,
    default: 0,
  }
}, { _id: false });

const RuleSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  }
}, { _id: false });

const WorkspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: [ImageMetaDataSchema],
  statistics: StatisticsSchema,
  rules: [RuleSchema],
});

const Workspace = mongoose.model('Workspace', WorkspaceSchema);

module.exports = {
  Workspace,
  WorkspaceSchema,
  ImageMetaDataSchema,
  StatisticsSchema,
}