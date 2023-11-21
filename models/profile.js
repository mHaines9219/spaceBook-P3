const User = require("./user");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    username: {
      type: String,
      required: true,
      default: "Earthling",
    },
    avatar: String,

    species: String,
    favPlanet: {
      type: String,
      enum: [
        "mercury",
        "venus",
        "earth",
        "mars",
        "jupiter",
        "saturn",
        "uranus",
        "neptune",
        "pluto",
      ],
    },
    bio: {
      type: String,
      maxLength: 500,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "Profile",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
