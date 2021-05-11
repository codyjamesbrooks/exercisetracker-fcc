const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const db = require("./db");
const UserController = require("./controllers/UserController");
const Exercise = require("./models/ExerciseSchema");

app.use(cors());
app.use(express.urlencoded({ extended: true })); // Express body parser
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", function (req, res) {
  UserController.createAndSave(req.body.username, res);
  // res.json({ username: req.body.username });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
