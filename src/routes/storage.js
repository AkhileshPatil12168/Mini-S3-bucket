const express = require("express");
const Router = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const {
  getStorageInfo,
  getFullStorageInfo,
} = require("../controllers/storageControllers/storageInformation");
const {
  getAllStorages,
  getStorage,
} = require("../controllers/adminControllers/get data/getStorages");

Router.get("/user/:userId/storageinfo/v1", authentication, authorization, getStorageInfo);
Router.get("/user/:userId/storageinfo/v2", authentication, authorization, getFullStorageInfo);

Router.get("/admin/:userId/storages", authentication, authorization, getAllStorages);
Router.get("/admin/:userId/storage/:storageId", authentication, authorization, getStorage);

module.exports = Router;
