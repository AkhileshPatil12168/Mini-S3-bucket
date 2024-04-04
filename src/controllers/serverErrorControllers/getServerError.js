const serverErrorsModel = require("../../models/serverErrorsModel");
const recordServerError = require("./recordServerError");

const getServerErrors = async (req, res) => {
  try {
    //const pageNo = req.query.pageNo
    const data = await serverErrorsModel.find().lean();
    return res.status(200).send({ status: true, message: "data found", data });
  } catch (error) {
    recordServerError(error, req);
    res.status(500).send({ status: false, message: error.message });
  }
};

const getServerErrorById = async (req, res) => {
  try {
    const errorId = req.params.errorId;
    const data = await serverErrorsModel.findById(errorId).lean();
    if (!data) return res.status(400).send({ status: false, message: "data not found" });
    return res.status(200).send({ status: true, message: "data found", data });
  } catch (error) {
    recordServerError(error, req);
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { getServerErrorById, getServerErrors };
