const { Schema, model } = require("mongoose");

// New User Schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Sorry, a valid email addres is required!",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: `Thought`,
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: `User`,
      },
    ],
  },
  {
    toJSON: {
      // Allow virtuals
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
