const bcrypt = require("bcrypt");

const userModel = require("../../models/userModel");
const { isValidObjectId } = require("../../utils/validators");

const getUserDetails = async function (req, res) {
    try {
        const userId = req.params.userId;
       

        const userData = await userModel
            .findById(userId)
            .select({ __v: 0, updatedAt: 0, createdAt: 0, isDeleted: 0, password: 0 })
            .lean();
        if (!userData) return res.status(404).send({ status: false, message: "user not found." });

        return res
            .status(200)
            .send({ status: true, message: "Users profile details", data: userData });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

module.exports = getUserDetails;
