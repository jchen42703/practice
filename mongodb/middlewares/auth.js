require("dotenv").config();
const checkAuthHeader = (req, res, next) => {
  if (req.header("Authorization") === process.env.AUTH_SECRET) {
    console.log("Authorized!");
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = checkAuthHeader;
