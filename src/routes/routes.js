const express = require("express");
const Router = express.Router();

const login = require("./login");
const adminRoute = require("./admin");
const userRoute = require("./user");
const storageRoute = require("./storage");
const bucketRoute = require("./bucket");
const objectRoute = require("./object");
const contactUsRoute = require("./contactUs");
const serverErrorRoute = require("./serverErrors")

// const reportsRoute = require("./reports")

Router.use(login);
Router.use(adminRoute);
Router.use(userRoute);
Router.use(bucketRoute);
Router.use(objectRoute);
Router.use(contactUsRoute);
Router.use(storageRoute);
Router.use(serverErrorRoute)

// Router.use(reportsRoute)

//_____FOR NOT VALID APIs_____
Router.all("/*", (req, res) => {
  res.status(404).send({ status: false, message: "invalid request!!" });
});

module.exports = Router;
