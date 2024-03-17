const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");

const createUser = require("../controllers/userControllers/createUser");
const getUserDetails = require("../controllers/userControllers/getUser");
const updateUser = require("../controllers/userControllers/updateUser");
const authorization = require("../middleware/authorization");
const deleteUser = require("../controllers/userControllers/deleteUser");

// const contactUs = require("../controllers/userController/contactUs");

Router.post("/create/user/", createUser);
Router.get("/user/:userId/profile", authentication, getUserDetails);
Router.put("/user/:userId/profile", authentication, updateUser);
Router.delete("/user/:userId/profile", authentication, authorization, deleteUser);
// Router.post("/user/:userId/contactus", authentication, contactUs);

module.exports = Router;
