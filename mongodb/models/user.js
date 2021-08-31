//Require Mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  uuid: {
    type: String,
    unique: true,
  },
});

userSchema.pre("save", function save(next) {
  console.log("saved user");
  next();
});

// Compile model from schema
const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
