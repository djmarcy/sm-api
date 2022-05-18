const { User, Thought } = require("../models");
const reactionSchema = require("../models/Reactions");

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
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "That thought doesn't exist.",
            })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //POST (Create) New Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { runValidators: true, new: true }
        ).then((thought) => res.json(thought));
      })
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
      .then(
        User.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.body.reactionId } } },
          { runValidators: true, new: true }
        )
      )
      .then((thought) =>
        !thought
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
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({
              message: "That reaction doesn't exist.",
            })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
  //DELETE to Remove Reaction from Thought
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({
              message: "That reaction doesn't exist.",
            })
          : res.json({
              message: `Your reaction has been deleted!`,
            })
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtRoutes;
