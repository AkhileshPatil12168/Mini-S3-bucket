const userModel = require("../../models/userModel");
const roleModel = require("../../models/roleModel");
const bcrypt = require("bcrypt");

const {
  emptyBody,
  isNotProvided,
  validTrim,
  isValidWord,
  isValidEmail,
  isValidPhone,
  isValidPwd,
  isValidObjectId,
  isValidDate,
} = require("../../utils/validators");

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const decodedToken = req.verifyed;

    if (!userId) return res.status(400).send({ status: false, message: "Please provide userId." });

    if (!isValidObjectId(userId))
      return res.status(403).send({ status: false, message: "please login again" });

    let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);
    if (!isCorrectUser)
      return res.status(403).send({ status: false, message: "please login again" });

    const userData = await userModel.findById(userId);
    if (!userData) return res.status(404).send({ status: false, message: "user not found." });

    if (emptyBody(req.body))
      return res.status(400).send({ status: false, message: "provide some data" });
    let data = req.body;

    let { fname, lname, email, phone, password, dateOfBirth } = data;

    if (fname) {
      if (!isNotProvided(fname))
        return res.status(400).send({ status: false, message: "provide the fname" });

      data.fname = validTrim(fname);
      if (!isValidWord(data.fname))
        return res.status(400).send({ status: false, message: "enter a valid fname" });
    }

    if (lname) {
      if (!isNotProvided(lname))
        return res.status(400).send({ status: false, message: "provide the lname" });

      data.lname = validTrim(lname);
      if (!isValidWord(data.lname))
        return res.status(400).send({ status: false, message: "enter a valid lname" });
    }

    if (email) {
      if (!isNotProvided(email))
        return res.status(400).send({ status: false, message: "provide the email" });

      data.email = validTrim(email);
      if (!isValidEmail(data.email))
        return res.status(400).send({ status: false, message: "enter a valid email" });
    }

    let checkEmail = await userModel.findOne({ email: data.email });
    if (checkEmail) return res.status(400).send({ status: false, message: "Email already exist" });

    if (phone) {
      if (!isNotProvided(phone))
        return res.status(400).send({ status: false, message: "provide the phone" });

      data.phone = validTrim(phone);
      if (!isValidPhone(data.phone))
        return res.status(400).send({ status: false, message: "enter a valid phone" });
    }

    let checkPhone = await userModel.findOne({ phone: data.phone });
    if (checkPhone)
      return res.status(400).send({ status: false, message: "Phone number already exist" });

    if (password) {
      if (!isNotProvided(password))
        return res.status(400).send({ status: false, message: "provide the password" });

      password = password.trim();
      if (!isValidPwd(password))
        return res.status(400).send({ status: false, message: "enter a valid password" });
      data.password = await bcrypt.hash(password, Number(process.env.SALT));
    }

    if (dateOfBirth) {
      dateOfBirth = Number(dateOfBirth);
      if (!isValidDate(dateOfBirth))
        return res
          .status(400)
          .send({ status: false, message: "Please provide a valid start date." });
      data.dateOfBirth = dateOfBirth;
    }

    let updateData = await userModel.findByIdAndUpdate(userId, data, {
      new: true,
    });

    if (data.email || data.password || data.phone) {
      await roleModel.findOneAndUpdate(
        { originalId: userId },
        { email: data.email, password: data.password, phone: data.phone },
        { new: true }
      );
    }

    return res.status(200).send({
      status: true,
      message: "Update user profile is successful",
      data: updateData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = updateUser;
