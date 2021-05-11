const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  description: String,
  duration: Number,
  date: Date,
});

const userSchema = new Schema({
  username: { type: String, required: true },
  exercises: [exerciseSchema],
});

module.exports = mongoose.model("User", userSchema);
