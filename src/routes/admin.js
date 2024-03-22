const express = require("express");
const Router = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const createAdmin = require("../controllers/adminControllers/createAdmin");
const updateAdmin = require("../controllers/adminControllers/updateAdmin");
const deleteAdmin = require("../controllers/adminControllers/deleteAdmin");
const getServerInformation = require("../controllers/adminControllers/get data/getServerInfo");

Router.post("/create/admin/", createAdmin);
Router.put("/admin/:userId/profile", authentication, authorization, updateAdmin);
Router.delete("/admin/:userId/profile", authentication, authorization, deleteAdmin);

Router.get("/admin/:userId/serverinfo/v1", getServerInformation)

module.exports = Router;
