const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const objectSchema = new mongoose.Schema(
  {
    userId: {
      type: objectId,
      ref: "User",
      required: true,
    },
    
    bucketId: {
      type: objectId,
      ref: "Buckets",
      required: true,
    },

    objectName: {
      type: String,
    },

    objectMiniId: { type: String },

    objectType: { type: String },

    objectSize: {
      type: Number,
    },

    objectPath: {
      type: String,
    },

    objectLink: {
      type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Objects", objectSchema);
