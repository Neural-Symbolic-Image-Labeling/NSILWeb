const { mongoose } = require('../../mongoose');

const ImageLabelSchema = new mongoose.Schema({
  name: { // label(s)
    type: [String],
    required: true,
  },
  canvasId: {
    type: String,
  },
  mark: { // segmentation target information, see Typescript definition for more details
    type: mongoose.Schema.Types.Mixed,
  }
});

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
  labeled: {
    type: Boolean,
    required: true,
    default: false,
  },
  manual: {
    type: Boolean,
    required: true,
    default: false,
  }
}, { _id: false });

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
  autoLabeled: {
    type: Number,
    required: true,
    default: 0,
  }
}, { _id: false });

const LiteralSchema = new mongoose.Schema({
  literal: {
    type: String,
    required: true,
  },
  naturalValue: {
    type: String,
    default: "",
  },
  modified: {
    type: Boolean,
    default: false,
  },
  modifiedValue: {
    type: String,
  },
  locked: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  }
}, { _id: false });

const ClauseSchema = new mongoose.Schema({
  literals: {
    type: [LiteralSchema],
    default: [],
  }
});

const RuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  clauses: {
    type: [ClauseSchema], // array of clauses
    default: []
  }
});

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
  LiteralSchema,
  ClauseSchema,
  StatisticsSchema,
}