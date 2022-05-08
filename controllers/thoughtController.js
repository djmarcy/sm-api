const { Thought } = require("../models");

const thoughtRoutes = {
  //GET All Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //GET Single Thought
  getUser(req, res) {
    Thought.findOne({ _id: req.params.id })
      .select("-__v")
      .then((thought) => {
        if (!thought) {
        } else {
          res.json();
        }
      })
      .catch((err) => res.status(500).json(err));
    }
  //POST (Create) New Thought
  //PUT (Update) Thought
  //DELETE Thought
  // spacer
  //POST Reaction to Thought
  //DELETE to Remove Reaction from Thought
};

module.exports = thoughtRoutes;
