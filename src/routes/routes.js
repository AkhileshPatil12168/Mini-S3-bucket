const express = require("express");
const Router = express.Router();

const login = require("./login");
// const adminRoute = require("./admin");
const userRoute = require("./user");
const bucketRoute = require("./bucket");
const objectRoute = require("./object");
// const cartRoute = require("./cart");
// const orderRoute = require("./order");
// const testRoute = require("./test");
// const reviewRoute = require("./review")
// const wishListRoute = require("./wishList")
// const advertisementRoute = require("./advertisement")
// const reportsRoute = require("./reports")


Router.use(login);
// Router.use(adminRoute);
Router.use(userRoute);
Router.use(bucketRoute);
Router.use(objectRoute);
// Router.use(cartRoute);
// Router.use(orderRoute);
// Router.use(testRoute);
// Router.use(reviewRoute);
// Router.use(wishListRoute)
// Router.use(advertisementRoute)
// Router.use(reportsRoute)

//_____FOR NOT VALID APIs_____
Router.all("/*", (req, res) => {
  res.status(404).send({ status: false, message: "invalid request!!" });
});

module.exports = Router;
