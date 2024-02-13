const mongoose = require("mongoose");
const { Schema } = mongoose;
const commentModule = new Schema({
  message: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

const comments = mongoose.model("comment", commentModule);

module.exports = comments;
