const serverErrorsModel = require("../../models/serverErrorsModel");
const recordServerError = require("./recordServerError");

const updateServerError = async (req, res) => {
  try {
    const { errorId } = req.params;
    const { resolved } = req.body;

    if (typeof resolved != Boolean && resolved !== true)
      return res.status(400).send({ status: false, message: "Value should be in boolean" });

    const updatedData = await serverErrorsModel
      .findByIdAndUpdate(errorId, { resolved }, { new: true })
      .lean();

    if (!updatedData) return res.status(400).send({ status: false, message: "Error not updated" });
    return res
      .status(200)
      .send({ status: true, message: "Updated successfully", data: updatedData });
  } catch (error) {
    recordServerError(error, req);
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = updateServerError;
