const mongoose = require("mongoose");

const serverErrorSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      trim: true,
    },

    originalUrl: {
      type: String,
      trim: true,
    },
    requestBody: {},

    errorType: [{ type: String, trim: true }],

    errorLocation: {
      type: String,
      trim: true,
    },

    ipAddress: { type: String },

    headers: {},

    queryParameters: {},

    pathParameters: {},

    resolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Server_Errors", serverErrorSchema);
