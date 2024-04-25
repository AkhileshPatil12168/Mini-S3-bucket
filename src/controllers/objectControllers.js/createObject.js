const fs = require("fs");
const path = require("path");
const { nanoid } = require("nanoid");

const objectModel = require("../../models/objectModel");
const bucketModel = require("../../models/bucketModel");
const addUnderscore = require("../../utils/addUnderscore");
const storageModel = require("../../models/storageModel");
const recordServerError = require("../serverErrorControllers/recordServerError");

const createObject = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bucketId = req.params.bucketId;

    const getBucket = await bucketModel
      .findById(bucketId)
      .select({ bucketName: 1, bucketPath: 1 })
      .lean();

    if (!getBucket)
      return res.status(400).send({ status: false, message: "bucket does not exist." });

    const files = req.files;

    if (files.length == 0)
      return res.status(400).send({ status: false, message: "no file uploaded" });
    let arrayOfObjects = [];
    let totalSize = 0;

    for (let obj of files) {
      let object = { userId, bucketId };
      let originalname = addUnderscore(obj.originalname);

      const checkDuplicateName = await objectModel
        .findOne({ objectName: originalname, isDeleted: false })
        .select({ _id: 1 })
        .lean();
      if (checkDuplicateName)
        return res.status(400).send({ status: false, message: `${originalname} already exists.` });

      const filePath = path.join(getBucket.bucketPath, originalname);
      const dirPath = path.dirname(filePath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      fs.writeFileSync(filePath, obj.buffer);
      object.objectName = originalname;
      object.objectType = obj.mimetype;
      object.objectSize = obj.size;
      totalSize += obj.size;
      object.objectPath = filePath;
      object.objectMiniId = nanoid(7);
      object.objectLink = `${process.env.SERVER}object/${object.objectMiniId}`;
      arrayOfObjects.push(object);
    }

    const createdObject = await objectModel.insertMany(arrayOfObjects);
    await bucketModel.findByIdAndUpdate(
      bucketId,
      { $inc: { bucketSize: totalSize, totalObjects: arrayOfObjects.length } },
      { upsert: true, new: true }
    );

    await storageModel.findOneAndUpdate(
      { userId },
      {
        $inc: { usedSpace: totalSize, freeSpace: -totalSize, totalObjects: arrayOfObjects.length },
      },
      { upsert: true, new: true }
    );

    return res.status(200).send({
      status: true,
      message: "object uploaded successfully",
      data: createdObject,
    });
  } catch (error) {
    recordServerError(error, req);
    res.status(500).send({ status: false, message: error.message });
  }
};
module.exports = createObject;
