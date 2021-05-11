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
};

module.exports = UserController;
