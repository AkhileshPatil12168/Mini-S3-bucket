const bucketModel = require("../../models/bucketModel");
const objectModel = require("../../models/objectModel");

const { isValidObjectId } = require("../../utils/validators");

const getBuckets = async (req, res) => {
  try {
    const userId = req.params.userId;

    const availableBuckets = await bucketModel
      .find({ userId })
      .select({ __v: 0, isDeleted: 0, bucketPath: 0, userId: 0 })
      .lean();
    if (availableBuckets.length == 0)
      return res.status(204).send({ status: false, message: "no buckets availble" });

    return res.status(200).send({
      status: true,
      message: "found",
      data: availableBuckets,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const getBucket = async (req, res) => {
  try {
    const bucketId = req.params.bucketId;

    if (!bucketId) return res.status(400).send({ status: false, message: "bucket Id is required" });

    if (!isValidObjectId(bucketId))
      return res.status(400).send({ status: false, message: "please check bucket Id" });

    const bucket = await bucketModel
      .findById(bucketId)
      .select({ __v: 0, isDeleted: 0, bucketPath: 0 })
      .lean();
    if (!bucket) return res.status(204).send({ status: false, message: "no bucket availble" });

    const objects = await objectModel
      .find({ bucketId })
      .select({
        objectName: 1,
        objectType: 1,
        objectSize: 1,
        objectLink: 1,
        createdAt: 1,
        objectMiniId: 1,
      })
      .lean();

    return res.status(200).send({
      status: true,
      message: "found",
      data: { bucket, objects },
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { getBuckets, getBucket };
