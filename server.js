const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const db = require("./db");
const UserController = require("./controllers/UserController");

app.use(cors());
app.use(express.urlencoded({ extended: true })); // Express body parser
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", function (req, res) {
  UserController.createAndSave(req.body.username, res);
});

app.get("/api/users", function (req, res) {
  UserController.getAllUsers(res);
});

app.post("/api/users/:_id/exercises", function (req, res) {
  let date = req.body.date ? Date.parse(req.body.date) : Date.now();
  const exercise = {
    description: req.body.description,
    duration: req.body.duration,
    date: date,
  };
  UserController.addExercise(req.body[":_id"], exercise, res);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
