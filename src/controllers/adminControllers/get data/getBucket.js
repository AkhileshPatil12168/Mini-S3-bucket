const bucketModel = require("../../../models/bucketModel");
const objectModel = require("../../../models/objectModel");

const adminGetBucket = async (req, res) => {
  try {
    const bucketId = req.params.bucketId;

    const bucket = await bucketModel
      .findOne({ _id: bucketId, isDeleted: false })
      .select({ isDeleted: 0, __v: 0 })
      .sort({ createdAt: -1 })
      .lean();

    const objects = await objectModel
      .find({ bucketId, isDeleted: false })
      .select({
      
      })
      .sort({ updatedAt: -1 })
      .lean();

    return res.status(200).send({ status: true, data: { bucket, objects } });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};

module.exports = adminGetBucket;
