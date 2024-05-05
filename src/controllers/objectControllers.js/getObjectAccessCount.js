const objectAccessCountModel = require("../../models/ObjectAccessCountModel");
const recordServerError = require("../serverErrorControllers/recordServerError");

const getObjectAccessCount = async (req, res) => {
  try {
    const { objectId } = req.params;
    const data = await objectAccessCountModel
      .find(objectId)
      .select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })
      .sort({ date: -1 })
      .lean();

    return res.status(200).send({ status: true, message: "found", data });
    
  } catch (error) {
    recordServerError(error, req);
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = getObjectAccessCount;
