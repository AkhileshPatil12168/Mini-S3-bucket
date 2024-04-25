const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Router = require("./routes/routes");

require("dotenv").config();

app.use(multer().any());
app.use(cookieParser());

app.use(
  "*",
  cors({
    origin: [
      process.env.FRONTEND_LOCAL_SERVER,
      process.env.FRONTEND_WIFI_ROUTER,
      process.env.FRONTEND_GLOBAL_SERVER,
    ],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use("/", Router);

mongoose
  .connect(process.env.mongoClust)
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.listen(process.env.port, () => {
  console.log("server is live at " + process.env.PORT);
});
