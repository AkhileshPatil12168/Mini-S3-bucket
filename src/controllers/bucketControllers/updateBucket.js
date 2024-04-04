const bucketModel = require("../../models/bucketModel");

const { isNotProvided, validTrim, isValidWord, emptyBody } = require("../../utils/validators");
const recordServerError = require("../serverErrorControllers/recordServerError");

const updateBucket = async (req, res) => {
  try {
    const bucketId = req.params.bucketId;
    let { bucketName } = req.body;

    if (emptyBody(req.body))
      return res.status(400).send({ status: false, message: "provide some data" });

    const checkBucket = await bucketModel
      .findById(bucketId)
      .select({ _id: 1, bucketName: 1, bucketPath: 1 })
      .lean();
    if (!checkBucket) return res.status(404).send({ status: false, message: "bucket not found." });

    if (bucketName) {
      if (!isNotProvided(bucketName))
        return res.status(400).send({ status: false, message: "provide the bucket name" });

      bucketName = validTrim(bucketName);
      if (!isValidWord(bucketName))
        return res.status(400).send({ status: false, message: "enter a valid bucket name" });
    }
    if (checkBucket.bucketName == bucketName)
      return res.status(404).send({ status: false, message: "use different keywords" });
    const updatedBucket = await bucketModel
      .findByIdAndUpdate(bucketId, { bucketName }, { new: true })
      .select({ bucketName: 1 })
      .lean();

    return res.status(200).send({
      status: true,
      message: "bucket updated successful",
      data: updatedBucket,
    });
  } catch (error) {
    recordServerError(error, req);
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = updateBucket;
