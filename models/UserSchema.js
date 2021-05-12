const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  description: { type: String, required: [true, "description is required"] },
  duration: { type: Number, required: true },
  date: Date,
});

const userSchema = new Schema({
  username: { type: String, required: true },
  exercises: [exerciseSchema],
});

module.exports = mongoose.model("User", userSchema);
