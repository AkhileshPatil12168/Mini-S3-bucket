const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const createBucket = require("../controllers/bucketControllers/createBucket");
const { getBuckets, getBucket } = require("../controllers/bucketControllers/getBucket");
const updateBucket = require("../controllers/bucketControllers/updateBucket");
const adminGetBucket = require("../controllers/adminControllers/get data/getBucket");

Router.post("/user/:userId/bucket/create", authentication, authorization, createBucket);
Router.get("/user/:userId/buckets", authentication, authorization, getBuckets);
Router.get("/user/:userId/bucket/:bucketId", authentication, authorization, getBucket);
Router.put("/user/:userId/bucket/:bucketId", authentication, authorization, updateBucket);


Router.get("/admin/:userId/bucket/:bucketId", authentication, authorization, adminGetBucket)
module.exports = Router;
