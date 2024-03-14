const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const createObject = require("../controllers/objectControllers.js/createObject");



Router.post("/user/:userId/bucket/:bucketId", authentication, authorization, createObject);

module.exports = Router;
