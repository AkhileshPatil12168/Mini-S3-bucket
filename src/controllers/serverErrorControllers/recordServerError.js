const serverErrorModel = require("../../models/serverErrorsModel");

const recordServerError = async (error, reqData) => {
  try {
    let data = {
      url: reqData.url,
      originalUrl: reqData.originalUrl,
      requestBody: reqData.body,
      errorLocation: error.stack.split("\n")[1],
      errorType: error.stack.split("\n")[0].split(":"),
      ipAddress: reqData.ip,
      headers: reqData.headers,
      queryParameters: reqData.query,
      pathParameters: reqData.params,
    };

    await serverErrorModel.create(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = recordServerError;
