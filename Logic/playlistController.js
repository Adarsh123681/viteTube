const PlayList = require("../model/Playlist");
const User = require("../model/Userschema");
const Video = require("../model/videoSchema");
// create playlist
const create_playlist = async (req, res) => {
  const { playlistName } = await req.body;
  const createPlaylist = await PlayList.create({
    playlistName,
  });
  if (!createPlaylist) {
    res.status(400).json({ msg: "playlist not created" });
  }
  const savedPlaylist = await createPlaylist.save();
  if (savedPlaylist) {
    console.log(savedPlaylist);
    res.status(200).json({
      msg: "successfully saved the playlist anf also created the playlist",
    });
  } else {
    res.status(400).json({ msg: "playlist not created" });
  }
};

// add videos to playlist
const addVideos_to_playlist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { videoId } = req.body;

    // Find the playlist by ID
    const playlist = await PlayList.findById(playlistId); 
    // Find the video by ID
    const video = await Video.findOne({videoId : videoId});
    
    // If playlist or video not found, return error
    if (!playlist || !video) {
      return res.status(404).json({ error: "Playlist or video not found" });
    }

    // Push the video object directly into the videos array of the playlist
    playlist.videos.push(video);
    await playlist.save();

    // Send the updated playlist as the response
    res.json(playlist);
  } catch (error) {
    console.error("Error adding video to playlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const get_all_playlist = async (req, res) => {
  // const userId = req.params.userId;
  // if (!userId) {
  //   res.status(400).json({ msg: "user_Not_found" });
  // } else {
  //   res.status(200).json({ msg: "getting all playlist of a user" });
  // }
  const findPlaylist = await PlayList.find();
  if (findPlaylist) {
    console.log("Playlist are founded..");
    console.log(findPlaylist);
  } else {
    console.log("playlist are not founded");
  }
};

const deletePlaylist = async () => {
  const findPlaylist = await PlayList.deleteMany();
  if (findPlaylist) {
    console.log("Playlist are founded..");
    console.log(findPlaylist);
  } else {
    console.log("playlist are not founded");
  }
};
module.exports = {
  addVideos_to_playlist,
  create_playlist,
  get_all_playlist,
  deletePlaylist,
};
