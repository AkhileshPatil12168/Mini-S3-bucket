const bcrypt = require("bcrypt");
const {
    isValidObjectId
  } = require("../utils/validators");
const recordServerError = require("../controllers/serverErrorControllers/recordServerError");

const authorization = async (req, res, next) => {
    try {

        const userId = req.params.userId;
        const decodedToken = req.verifyed;
    
        if (!userId) return res.status(400).send({ status: false, message: "Please provide userId." });
    
        if (!isValidObjectId(userId))
          return res.status(403).send({ status: false, message: "please login again" });
    
        let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);
    
        if (!isCorrectUser)
          return res.status(403).send({ status: false, message: "please login again" });

          next();
    } catch (error) {
      recordServerError(error, req);
        res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = authorization;
