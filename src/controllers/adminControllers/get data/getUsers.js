const storageModel = require("../../../models/storageModel");

const adminGetAllUsers = async (req, res) => {
  try {
    const users = await storageModel
      .find({ isDeleted: false })
      .select({ userId: 1, createdAt: 1 })
      .skip(/* number of docs     */)
      .limit(/*  */)
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).send({ status: true, data: users });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};

const adminGetUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const users = await storageModel
      .findOne({ isDeleted: false, userId })
      .populate({ path: "userId", select: "lname fname email dateOfBirth" })
      .populate({ path: "buckets.bucketId", select: "bucketName" })
      .select({ __v: 0, isDeleted: 0, updatedAt: 0 })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).send({ status: true, data: users });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};

module.exports = { adminGetAllUsers, adminGetUser };
