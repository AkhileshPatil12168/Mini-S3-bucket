const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const userModel = require("../../models/userModel");
const roleModel = require("../../models/roleModel");
const storageModel = require("../../models/storageModel");
// const mailSender = require("../NodeMailer/nodeMailer");

const {
  emptyBody,
  validTrim,
  isValidWord,
  isValidEmail,
  isValidPhone,
  isValidPwd,
  isValidDate,
} = require("../../utils/validators");
const recordServerError = require("../serverErrorControllers/recordServerError");

const createUser = async (req, res) => {
  try {
    let { fname, lname, email, phone, password, dateOfBirth } = req.body;

    if (emptyBody(req.body))
      return res.status(400).send({ status: false, message: "provide some data" });

    if (!fname) return res.status(400).send({ status: false, message: "First name is required" });
    fname = validTrim(fname);
    if (!isValidWord(fname))
      return res.status(400).send({ status: false, message: "enter a valid fname" });

    if (!lname) return res.status(400).send({ status: false, message: "last name is required" });
    lname = validTrim(lname);
    if (!isValidWord(lname))
      return res.status(400).send({ status: false, message: "enter a valid lname" });

    if (!email) return res.status(400).send({ status: false, message: "email is required" });
    email = validTrim(email);
    if (!isValidEmail(email))
      return res.status(400).send({ status: false, message: "enter a valid email" });

    let checkEmail = await userModel.findOne({ email: email }).lean();
    if (checkEmail) return res.status(400).send({ status: false, message: "Email already exist" });

    if (!phone) return res.status(400).send({ status: false, message: "phone is required" });
    phone = validTrim(phone);
    if (!isValidPhone(phone))
      return res.status(400).send({ status: false, message: "enter a valid phone" });

    let checkPhone = await userModel.findOne({ phone: phone }).lean();
    if (checkPhone)
      return res.status(400).send({ status: false, message: "Phone number already exist" });

    if (!password) return res.status(400).send({ status: false, message: "password is required" });
    password = password.trim();
    if (!isValidPwd(password))
      return res.status(400).send({ status: false, message: "enter a valid password" });
    password = await bcrypt.hash(password, Number(process.env.SALT));

    if (!dateOfBirth)
      return res.status(400).send({ status: false, message: "Please provide the start date." });
    dateOfBirth = Number(dateOfBirth);
    if (!isValidDate(dateOfBirth))
      return res.status(400).send({ status: false, message: "Please provide a valid start date." });

    let user = {
      fname,
      lname,
      email,
      phone,
      password,
      dateOfBirth,
    };
    const createUser = await userModel.create(user);

    const createRole = await roleModel.create({
      originalId: createUser._id,
      email: email,
      password: password,
      phone: phone,
      roleRef: "User",
    });

    await storageModel.create({ userId: createUser._id });

    const absoluteDirPath = path.resolve(__dirname, "../../storages");

    if (!fs.existsSync(absoluteDirPath)) {
      throw new Error(`Directory '${absoluteDirPath}' does not exist.`);
    }

    const newDirPath = path.join(absoluteDirPath, `${createUser._id}`);
    await fs.mkdir(newDirPath, (err) => {
      if (err) console.log(err);
    });

    // mailSender(email, "singUp", "registeration successful");

    return res.status(201).send({
      status: true,
      message: "User created successfully",
      data: createUser,
    });
  } catch (error) {
    recordServerError(error, req);
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = createUser;
