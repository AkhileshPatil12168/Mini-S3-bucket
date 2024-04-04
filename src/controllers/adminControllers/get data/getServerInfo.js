const storageModel = require("../../../models/storageModel");
const userModel = require("../../../models/userModel");
const connectUsModel = require("../../../models/contactUsModel");
const bucketModel = require("../../../models/bucketModel");
const objectModel = require("../../../models/objectModel");

const getServerInformation = async (req, res) => {
  try {
    const data = {};
    data.server = await storageModel.aggregate([
      {
        $group: {
          _id: 0,
          overAllBuckets: { $sum: "$totalBuckets" },
          overAllObjects: { $sum: "$totalObjects" },
          OverAllStorageUsed: { $sum: "$usedSpace" },
          OverAllStorageAllocated: { $sum: "$storageSize" },
          overAllUsers: { $sum: 1 },
        },
      },
    ]);

    data.storages = await storageModel
      .find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .select({ userId: 1, usedSpace: 1, storageSize: 1 })
      .lean();

    data.users = await userModel
      .find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .select({ fname: 1, lname: 1, email: 1 })
      .limit(5)
      .lean();

    data.requests = await connectUsModel
      .find({ resolved: false })
      .sort({ requestedDate: -1 })
      .select({ name: 1, email: 1, requestedDate: 1, subject: 1 })
      .limit(10)
      .lean();

    data.buckets = await bucketModel
      .find()
      .sort({ createdAt: -1 })
      .select({ userId: 1, bucketName: 1 })
      .limit(5)
      .lean();

    data.objects = await objectModel
      .find()
      .sort({ createdAt: -1 })
      .select({ objectSize: 1 })
      .limit(10)
      .lean();

    return res.status(200).send({ status: true, message: "successfull", data:{...data,server:{...data.server[0]}} });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = getServerInformation;
