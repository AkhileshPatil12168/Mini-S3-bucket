const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const bucketSchema = new mongoose.Schema(
  {
    userId: {
      type: objectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bucketName: {
      type: String,
      required: true,
    },
    bucketPath: {
      type: String,
    },
    bucketSize: {
      type: Number,
      default: 0,
    },

    totalObjects: { type: Number, default: 0 },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Buckets", bucketSchema);
