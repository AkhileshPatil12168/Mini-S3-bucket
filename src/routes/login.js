const express = require("express");
const Router = express.Router();



const login = require("../controllers/loginController/login")

Router.post("/login", login);


module.exports = Router;
