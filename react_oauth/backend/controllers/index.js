const express = require("express");
const router = express.Router();

router.use("/user", require("./user.js"));
router.use("/auth", require("./oauth.js"));

router.get("/", (req, res) => {
  res.json(req.query);
  res.status(200);
});

module.exports = router;
