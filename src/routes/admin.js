const express = require("express");
const Router = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const createAdmin = require("../controllers/adminControllers/createAdmin");
const updateAdmin = require("../controllers/adminControllers/updateAdmin");
const deleteAdmin = require("../controllers/adminControllers/deleteAdmin");

const getServerInformation = require("../controllers/adminControllers/get data/getServerInfo");
const { adminGetAllUsers, adminGetUser } = require("../controllers/adminControllers/get data/getUsers");

Router.post("/create/admin/", createAdmin);
Router.put("/admin/:userId/profile", authentication, authorization, updateAdmin);
Router.delete("/admin/:userId/profile", authentication, authorization, deleteAdmin);

Router.get("/admin/:userId/serverinfo/v1", authentication, authorization, getServerInformation);

Router.get("/admin/:userId/users", authentication, authorization, adminGetAllUsers);
Router.get("/admin/:userId/user/:id", authentication, authorization, adminGetUser);


module.exports = Router;
