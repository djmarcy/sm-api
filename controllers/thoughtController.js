const { User, Thought } = require("../models");

const thoughtRoutes = {
  //GET All Thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //GET Single Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "That thought doesn't exist.",
            })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //POST (Create) New Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(
        User.findOneAndUpdate(
          { username: req.body.username },
          { $set: req.body }
        )
      )
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //PUT (Update) Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: { thoughtText: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "That thought doesn't exist.",
            })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //DELETE Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "That thought doesn't exist.",
            })
          : res.json({
              message: `User & associated thoughts have been deleted!`,
            })
      )
      .catch((err) => res.status(500).json(err));
  },
  // spacer
  //POST Reaction to Thought
  //DELETE to Remove Reaction from Thought
};

module.exports = thoughtRoutes;
