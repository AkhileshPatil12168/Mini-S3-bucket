const adminModel = require("../../models/adminModel");
const roleModel = require("../../models/roleModel");

const bcrypt = require("bcrypt");

const { isValidObjectId, emptyBody } = require("../../utils/validators");
const recordServerError = require("../serverErrorControllers/recordServerError");

const deleteAdmin = async (req, res) => {
  try {
    const userId = req.params.userId;

    const checkAdmin = await adminModel.findById(userId).select({ _id: 1 }).lean();

    if (!checkAdmin) return res.status(403).send({ status: false, message: "please login again" });

    if (emptyBody(req.body))
      return res.status(400).send({ status: false, message: "provide some data" });

    let data = req.body;

    let { password } = data;

    let user = await adminModel.findById(userId).lean();
    if (!user || user.isDeleted == true)
      return res.status(400).send({ status: false, message: "User not Exist" });

    let actualPassword = await bcrypt.compare(password, user.password);

    if (!actualPassword)
      return res.status(400).send({ status: false, message: "Incorrect password" });

    let updateData = await adminModel.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
    let updateRoleData = await roleModel.findOneAndUpdate(
      { originalId: userId },
      { isDeleted: true },
      { new: true }
    );
    if (updateData) {
      res.status(200).send({
        status: true,
        message: "deleted succesfully",
      });
    }
  } catch (error) {
    recordServerError(error, req);
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = deleteAdmin;
