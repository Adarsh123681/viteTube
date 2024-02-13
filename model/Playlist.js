const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({ 
  playlistName : {
     type : String
  },
  videos: [ 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Videos",
    }
  ],
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  }
}); 

const videoPlaylist = mongoose.model("playlist", playlistSchema);
module.exports = videoPlaylist;
