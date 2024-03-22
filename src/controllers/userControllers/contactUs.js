const contactUsModel = require("../../models/contactUsModel");
const bcrypt = require("bcrypt");

const {
  isNotProvided,
  validTrim,
  isValidEmail,
  isValidObjectId,
  isValidString,
} = require("../../utils/validators");

const contactUs = async (req, res) => {
  try {
    const data = req.body;
    let { userId, name, email, message } = data;

    if (!name) return res.status(400).send({ status: false, message: "name is requried" });
    if (!isNotProvided(name))
      return res.status(400).send({ status: false, message: "provide the name" });
    name = validTrim(name);
    if (!isValidString(name))
      return res.status(400).send({ status: false, message: "enter a valid name" });

    if (!email) return res.status(400).send({ status: false, message: "email is required" });
    email = validTrim(email);
    if (!isValidEmail(email))
      return res.status(400).send({ status: false, message: "enter a valid email" });

    if (!message) return res.status(400).send({ status: false, message: "message is requried" });
    if (!isValidString(message))
      return res.status(400).send({ status: false, message: "message is in incorrect format" });
    if (!isNotProvided(message))
      return res.status(400).send({ status: false, message: "provide the message" });
    message = validTrim(message);
    if (message.length < 15)
      return res
        .status(400)
        .send({ status: false, message: "message should contain 15 characters" });

    data.requestedDate = Date.now() + 19800000;

    const response = await contactUsModel.create(data);

    return res
      .status(200)
      .send({ status: true, message: "message send successfully", data: response });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = contactUs;
