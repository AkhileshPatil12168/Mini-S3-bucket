const express = require("express");
const Router = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const {getStorageInfo, getFullStorageInfo} = require("../controllers/storageControllers/storageInformation");

Router.get("/user/:userId/storageinfo/v1", authentication, authorization, getStorageInfo);
Router.get("/user/:userId/storageinfo/v2", authentication, authorization, getFullStorageInfo);

module.exports = Router;
