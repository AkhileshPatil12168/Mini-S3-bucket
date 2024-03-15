const objectModel = require("../../models/objectModel");
const { isValidObjectId } = require("../../utils/validators");

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
    const id = req.params.id
    


  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { getObject, getObjectByUrl };
