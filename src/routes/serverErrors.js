const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
  getServerErrors,
  getServerErrorById,
} = require("../controllers/serverErrorControllers/getServerError");
const updateServerError = require("../controllers/serverErrorControllers/updateServerError");

Router.get("/admin/:userId/errors", authentication, authorization, getServerErrors);
Router.get("/admin/:userId/error/:errorId", authentication, authorization, getServerErrorById);
Router.patch("/admin/:userId/error/:errorId", authentication, authorization, updateServerError);

module.exports = Router;
