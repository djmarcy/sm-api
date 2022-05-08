const { User } = require("../models");

const userRoutes = {
  //GET All Users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //GET Single User
  getUser(req, res) {
    User.findOne({ _id: req.params.userName })
      .select("-__v")
      .then((user) => {
        if (!user) {
        } else {
          res.json();
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  //POST (Create) New User
  //PUT (Update) User
  //DELETE User
  // spacer
  //POST Friend to User
  //DELETE to Remove Friend from User's List
};

module.exports = userRoutes;
