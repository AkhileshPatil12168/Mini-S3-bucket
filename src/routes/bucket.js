const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const createBucket = require("../controllers/bucketControllers/createBucket");
const { getBuckets, getBucket } = require("../controllers/bucketControllers/getBucket");

Router.post("/user/:userId/bucket/create", authentication, authorization, createBucket);
Router.get("/user/:userId/buckets", authentication, authorization, getBuckets);
Router.get("/user/:userId/bucket/:bucketId", authentication, authorization, getBucket);

module.exports = Router;
