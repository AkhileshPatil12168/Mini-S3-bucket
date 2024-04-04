const objectModel = require("../../models/objectModel");
const storageModel = require("../../models/storageModel");
const recordServerError = require("../serverErrorControllers/recordServerError");

const getStorageInfo = async (req, res) => {
  try {
    const userId = req.params.userId;

    const storageInfo = await storageModel
      .findOne({ userId })
      .populate({
        path: "buckets.bucketId",
        select: "bucketName bucketSize totalObjects",
      })
      .select({ storageSize: 1, usedSpace: 1, freeSpace: 1, buckets: 1 })
      .lean();

    const recentObjects = await objectModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .select({ objectName: 1, objectLink: 1 })
      .limit(5)
      .lean();

    return res.status(200).send({ data: { storageInfo, recentObjects } });
  } catch (error) {
    recordServerError(error, req);
    res.status(500).send({ status: false, message: error.message });
  }
};

const getFullStorageInfo = async (req, res) => {
  try {
    const userId = req.params.userId;

    const storageInfo = await storageModel
      .findOne({ userId })
      .populate({
        path: "buckets.bucketId",
        select: "bucketName bucketSize totalObjects ",
      })
      .select({
        storageSize: 1,
        usedSpace: 1,
        freeSpace: 1,
        buckets: 1,
        totalBuckets: 1,
        totalObjects: 1,
      })
      .lean();

    return res.status(200).send({ data: storageInfo });
  } catch (error) {
    recordServerError(error, req);
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { getStorageInfo, getFullStorageInfo };
