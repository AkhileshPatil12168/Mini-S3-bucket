const fs = require("fs");
const path = require("path");
const { createClient } = require("redis");

const client = createClient();
client.on("connection", async (stream) => {
  console.log("someone connected!");
});
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();

const objectModel = require("../../models/objectModel");
const { isValidObjectId } = require("../../utils/validators");
const recordServerError = require("../serverErrorControllers/recordServerError");

const getAllObjects = async (req, res) => {
  try {
    const userId = req.params.userId;

    const objects = await objectModel
      .find({ userId, isDeleted: false })
      .populate({ path: "bucketId", select: "bucketName" })
      .sort({ createdAt: -1 })
      .select({
        objectName: 1,
        createdAt: 1,
        objectLink: 1,
        objectType: 1,
        bucketId: 1,
        objectSize: 1,
      })
      .lean();

    if (objects.length == 0)
      return res.status(400).send({ status: false, message: "objects not found" });

    return res.status(200).send({
      status: true,
      message: "Objects found",
      data: objects,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const getObject = async (req, res) => {
  try {
    const objectId = req.params.objectId;

    if (!isValidObjectId(objectId))
      return res.status(400).send({ status: false, message: "check the object Id." });

    const bucketObject = await objectModel
      .findById(objectId)
      .select({ __v: 0, isDeleted: 0, userId: 0, bucketId: 0, objectPath: 0 });

    if (!bucketObject) return res.status(400).send({ status: false, message: "object not found" });

    return res.status(200).send({
      status: true,
      message: "Object found",
      data: bucketObject,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const getObjectByUrl = async (req, res) => {
  try {
    const objectMiniId = req.params.id;

    let data = await client.hGetAll(objectMiniId);

    if (Object.keys(data).length == 0) {
      data = await objectModel
        .findOne({ objectMiniId })
        .select({ objectType: 1, objectPath: 1, objectName: 1 })
        .lean();
      if (!data) res.status(404).send({ status: false, message: "not found" });
      await client.hSet(`${objectMiniId}`, JSON.parse(JSON.stringify(data)));
    }

    const fileData = await fs.promises.readFile(data.objectPath);

    /*__________________
    
    IMP do not ues express to send files or any content that have buffer data 
    it will add charset=utf-8 in content type. Which eventually stop rendering the buffer data.... 

    _______________________________ */

    // res.setHeader("Content-Length", fileData.length);
    // res.setHeader("Content-Disposition", `attachment; filename=${data.objectName}`);
    // res.send({ status: true, message: "success", data: fileData });

    /*__________________
    
    Instade use inbuild methods from nodejs http 

    _______________________________ */
    res.writeHead(200, {
      "content-type": data.objectType,
      "Content-Disposition": `attachment; filename=${data.objectName}`,
      "Content-Length": fileData.length,
    });
    res.end(fileData);
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { getAllObjects, getObject, getObjectByUrl };
