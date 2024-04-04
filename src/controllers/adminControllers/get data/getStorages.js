const storageModel = require("../../../models/storageModel");

const getAllStorages = async (req, res) => {
  try {
    const storages = await storageModel
      .find({ isDeleted: false })
      .select({ userId: 1, storageSize: 1, usedSpace: 1 })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).send({ status: true, data: storages });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};

const getStorage = async (req, res) => {
  try {
    const storageId = req.params.storageId;

    const storage = await storageModel
      .findOne({ _id: storageId, isDeleted: false })
      .populate({ path: "buckets.bucketId", select: "bucketName createdAt updatedAt" })
      .select({ __v: 0, isDeleted: 0, createdAt: 0, updatedAt: 0 })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).send({ status: true, data: storage });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};

module.exports = { getAllStorages, getStorage };
