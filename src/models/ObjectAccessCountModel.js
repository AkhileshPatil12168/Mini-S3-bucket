const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const objectAccessCountSchema = new mongoose.Schema(
  {
    objectId: {
      type: objectId,
      ref: "Objects",
      required: true,
    },
    totalAccessCount: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Object_access_Count", objectAccessCountSchema);
