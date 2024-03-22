const express = require("express");
const Router = express.Router();

const contactUs = require("../controllers/userControllers/contactUs");


Router.post("/contactus", contactUs);


module.exports = Router;
