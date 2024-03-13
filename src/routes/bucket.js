const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const createBucket = require("../controllers/bucketControllers/createBucket");

Router.post("/user/:userId/bucket/create", authentication, authorization, createBucket);

module.exports = Router;
