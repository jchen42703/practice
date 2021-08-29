require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");

const server = express();
const oauthClient = new OAuth2Client(process.env.CLIENT_ID);

server.use(express.json());
server.use(cors());

// This handles POST requests to /api/v1/auth/google , verifying and decoding the token,
// pulling out the three pieces of information we want to store, performs an upsert operation
// on our database, and returns the retrieved user as JSON.
server.post("/api/v1/auth/google", async (req, res) => {
  const { token } = req.body;
  const ticket = await oauthClient.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email } = ticket.getPayload();
  console.log(`${name}, ${email}`);
  // const user = await db.user.upsert({
  //   where: { email: email },
  //   update: { name, picture },
  //   create: { name, email, picture },
  // });
  res.status(201);
  // res.json(user);
});
