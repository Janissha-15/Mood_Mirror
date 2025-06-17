const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  moodHistory: {
    type: [String], // stores an array of moods (e.g., ["Happy", "Sad"])
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
