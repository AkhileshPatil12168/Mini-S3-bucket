const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const storageSchema = new mongoose.Schema(
  {
    userId: {
      type: objectId,
      ref: "User",
      required: true,
      unique: true,
    },
    storageSize: {
      type: Number,
      default: (500*1024*1024),
    },
    usedSpace: { type: Number, default: 0 },
    freeSpace: { type: Number, default: (500*1024*1024) },

    buckets: [
      {
        bucketId: {
          type: objectId,
          ref: "Buckets",
        },
      },
    ],
    totalBuckets: { type: Number, default: 0 },
    totalObjects: { type: Number, default: 0 },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Storage", storageSchema);
