const User = require("../models/UserSchema");

const UserController = {
  createAndSave: function (username, res) {
    const newUser = new User({ username: username });
    newUser.save((err, user) => {
      if (err) return console.error(err);
      res.json({
        username: user.username,
        _id: user._id,
      });
    });
  },
  getAllUsers: function (res) {
    User.find((err, users) => {
      if (err) return console.error(err);
      users = users.map((user) => {
        return {
          username: user.username,
          _id: user._id,
        };
      });
      res.json(users);
    });
  },
};

module.exports = UserController;
