require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

mongoose.Promise = Promise;
console.log(`mongo uri: ${process.env.MONGO_URI}`);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", () => {
  console.error(
    "MongoDB connection error. Please make sure MongoDB is running."
  );
  process.exit(1);
});

db.once("open", () => {
  console.info("connected to mongo");
});

app.use(cors());

app.set("port", process.env.PORT || 8080);

app.use(express.json());
app.use(require("./controllers"));

app.listen(app.get("port"), function () {
  console.info(
    `Node app running on port: ${app.get("port")} with NODE_ENV: ${app.get(
      "env"
    )}`
  );
});
