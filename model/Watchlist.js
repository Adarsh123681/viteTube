const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  watchlistName: {
    type: String,
    require : true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Videos",
      },
    },
  ],
});

let watchlist = mongoose.model("watchList", watchlistSchema);

module.exports = watchlist;
