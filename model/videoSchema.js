const mongoose = require("mongoose");
const { Schema } = mongoose;
const comment = require("./Comment");
const videoSchema = new Schema({
  title: String,
  description: String,
  videoFilename: String,
  videoPath: String,
  thumbnailFilename: String,
  thumbnailPath: String,
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],  
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  }
});

const video_model = mongoose.model("Videos", videoSchema);
module.exports = video_model;
