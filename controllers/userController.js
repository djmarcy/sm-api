const { User, Thought } = require("../models");

const userRoutes = {
  //GET All Users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //GET Single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "No user by this name exists. Please try again.",
            })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //POST (Create) New User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //PUT (Update) User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "No user with this name exists. Please try again.",
            })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //DELETE User
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "No user with this name exists. Please try again.",
            })
          : Thought.deleteMany({ _id: { $in: User.thoughts } })
      )
      .then(() =>
        res.json({
          message: `User & associated thoughts have been deleted!`,
        })
      )
      .catch((err) => res.status(500).json(err));
  },
  //POST Friend to User
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "No user with this name exists. Please try again.",
            })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //DELETE to Remove Friend from User's List
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "No user with this name exists. Please try again.",
            })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userRoutes;
