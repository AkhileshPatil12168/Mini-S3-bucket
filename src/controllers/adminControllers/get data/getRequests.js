const recordServerError = require("../../serverErrorControllers/recordServerError");
const connectUsModel = require("../../../models/contactUsModel");

const getAllRequests = async (req, res) => {
  try {
    data.requests = await connectUsModel
      .find({ resolved: false })
      .sort({ requestedDate: -1 })
      .select({ name: 1, email: 1, requestedDate: 1, subject: 1 })
      .limit(10)
      .lean();
  } catch (error) {
    recordServerError(error, req);
    res.status(500).send({ status: false, message: error.message });
  }
};
