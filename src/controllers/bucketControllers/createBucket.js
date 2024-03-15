const bucketModel = require("../../models/bucketModel");
const storageModel = require("../../models/storageModel");
const fs = require("fs");
const path = require("path");

const { validTrim, isValidWord } = require("../../utils/validators");

const createBucket = async (req, res) => {
  try {
    const userId = req.params.userId;

    let { bucketName } = req.body;

    if (!bucketName)
      return res.status(400).send({ status: false, message: "bucket name is required" });
    bucketName = validTrim(bucketName);
    if (!isValidWord(bucketName))
      return res.status(400).send({ status: false, message: "enter a valid bucket name" });

    const checkduplicate = await bucketModel.findOne({ userId, bucketName }).lean();
    if (checkduplicate)
      return res.status(400).send({ status: false, message: "use different name" });

    const absoluteDirPath = path.resolve(__dirname, `../../storages/${userId}`);
    if (!fs.existsSync(absoluteDirPath)) {
      throw new Error(`Directory '${absoluteDirPath}' does not exist.`);
    }

    const newBucket = await bucketModel.create({ userId, bucketName });

    const newDirPath = path.join(absoluteDirPath, `${newBucket._id}`);

    await fs.mkdir(newDirPath, (err) => {
      if (err) console.log(err);
    });
    const finalBucket = await bucketModel.findByIdAndUpdate(
      newBucket._id,
      {
        bucketPath: newDirPath,
      },
      { new: true }
    );

    await storageModel.findOneAndUpdate(
      { userId },
      {
        $push: { buckets: { bucketId: finalBucket._id } },
        $inc: { totalBuckets: 1 },
      },
      { upsert: true, new: true }
    );

    return res.status(200).send({
      status: true,
      message: "bucket created successfully",
      data: finalBucket,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = createBucket;
