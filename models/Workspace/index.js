const { mongoose } = require('../../mongoose');

const ImageLabelSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  segTarget: {
    type: String,
  }
}, {_id: false});

const ImageMetaDataSchema = new mongoose.Schema({
  imageId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  labels: [ImageLabelSchema],
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
}, {_id: false});

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

const ClauseSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  naturalValue: {
    type: String,
    default: "",
  }
}, { _id: false });

const RuleSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [ClauseSchema], // array of clauses
    default: []
  }
}, { _id: false });

const ImageCollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
    default: "Classification",
  },
  images: [ImageMetaDataSchema],
  statistics: StatisticsSchema,
  rules: [RuleSchema],
  externalRules: [RuleSchema],
});

const WorkspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  collections: [ImageCollectionSchema],
});

const Workspace = mongoose.model('Workspace', WorkspaceSchema);

module.exports = {
  Workspace,
  ImageCollectionSchema,
  ImageLabelSchema,
  WorkspaceSchema,
  ImageMetaDataSchema,
  ClauseSchema,
  StatisticsSchema,
}