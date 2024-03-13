const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Router = require("./routes/routes")

require("dotenv").config();

app.use(multer().any());
app.use(cookieParser());

app.use(
  "*",
  cors({
    origin: ["http://localhost:3001"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// const Router = require("./routes/routes");

app.use(express.json());
app.use("/", Router);

mongoose
  .connect(process.env.mongoClust)
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.listen(process.env.port, () => {
  console.log("server is live at " + process.env.PORT);
});
