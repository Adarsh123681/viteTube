const watchlist = require("../model/Watchlist");
const User = require("../model/Userschema");

const getWatchlist = async (req, res) => {
  const userId = req.params.userId;

  const Watchlist = await watchlist.findOne({ userId });
  console.log(Watchlist);
  if (!Watchlist) {
    console.log(Watchlist);
    res.status(404).json({ mssage: "watchList not founded" });
  } else {
    res.status(200).json(Watchlist);
  }
};

const postWatchlist = async (req, res) => {
  const userId = req.params.userId;
  const { watchlistName, items } = req.body; // array of the videos
  if (watchlistName == " ") {
    req.status(500).json({ msg: "watchlist name is required" });
  }
  console.log(items);
  try {
    let Watchlist = await watchlist.findOneAndUpdate(
      { userId },
      { watchlistName, userId, items },
      { upsert: true, new: true }
    );
    console.log(Watchlist);
    if (!Watchlist) {
      Watchlist = new watchlist({
        watchlistName: watchlistName,
        userId: userId,
        items: items,
      });
      res.status(400).json({ mes: "new watchlist Added" });
    } else {
      res.status(200).json({ msg: "watchlist founded successfully" });
      Watchlist.items = await items;
      Watchlist.save();
    }
  } catch (error) {
    console.log("Something is wrong", error);
  }
};
module.exports = { postWatchlist, getWatchlist };
