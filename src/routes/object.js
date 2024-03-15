const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const createObject = require("../controllers/objectControllers.js/createObject");
const { getObject } = require("../controllers/objectControllers.js/getObject");

Router.post("/user/:userId/bucket/:bucketId", authentication, authorization, createObject);
Router.get("/user/:userId/bucket/:bucketId/object/:objectId", authentication, authorization, getObject);

module.exports = Router;
