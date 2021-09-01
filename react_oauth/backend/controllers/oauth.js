const express = require("express");
const user = require("../models/user");
const googleAuth = require("../services/google_oauth");
const r = express.Router();

r.post("/verifyToken", async (req, res) => {
  console.log("Serverside POST to /auth/verifyToken");
  try {
    const payload = await googleAuth(req.body.tokenId);
    console.log("payload: ", payload);
    res.json({ success: true, ...payload });
  } catch (error) {
    console.log("/verifyToken error");
    console.log(error);
    res.sendStatus(401);
  }
});

module.exports = r;
