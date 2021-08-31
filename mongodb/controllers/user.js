const express = require("express");
const user = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const r = express.Router();

r.get("/accounts", async (req, res) => {
  let { userId } = req.query;
  console.log(`Finding user: ${userId}...`);
  if (userId) {
    let accounts = await user.userModel.find({ uuid: userId }).exec();
    res.json(accounts || []);
  }
});

r.post("/newAccount", async (req, res) => {
  let { email } = req.body;
  let e = new user.userModel({
    email: email,
    uuid: uuidv4(),
  });
  let x = await e.save();
  console.log(`Saved email: ${email}`);
  res.json({ success: true });
});

module.exports = r;
