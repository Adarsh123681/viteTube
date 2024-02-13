const {
  registerUser,
  logIn,
  aboutPage,
  getAllUsers,
  getUserWithId,
} = require("../Logic/userController");

const {
  getAllVideos,
  getUserVideo,
  likeVideo,
  dislikeVideo,
  deleteUserVideo,
  pushComment,
} = require("../Logic/videosControllers.js");

const {
  commentPost,
  getAllcommentofVideo,
} = require("../Logic/commentsControllers.js");

const { getSubscriber, countSubscribers } = require("../Logic/subscriberCount");
const {
  postWatchlist,
  getWatchlist,
} = require("../Logic/watchlistController.js");

const {
  create_playlist,
  addVideos_to_playlist,
  get_all_playlist,
  deletePlaylist
} = require("../Logic/playlistController.js");

const auth = require("../jwtVerification");

const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "uploads/" });
const Video = require("../model/videoSchema");
// user
// registerUser
router.post("/register", registerUser); //done
// loginUser
router.post("/logIn", logIn); // done
// GetAllUsers
router.get("/getAllUsers", getAllUsers); //done
// getUSerWithId
router.get("/:_id/getUserWithId", getUserWithId); //done
// testing authorize user
router.get("/about", auth, async (req, res) => {
  // pending
  console.log('about page')
  const username = await req.userName;
  console.log(username);
});
// videos router
router.post(
  "/upload",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  async (req, res) => {
    if (!req.files || !req.files["video"] || !req.files["thumbnail"]) {
      return res
        .status(400)
        .send("Both video and thumbnail files are required.");
    }

    const { video, thumbnail } = req.files;
    const { title, description } = req.body;

    const videoFile = video[0];
    const thumbnailFile = thumbnail[0];

    try {
      const videoData = new Video({
        title,
        description,
        videoFilename: videoFile.originalname,
        videoPath: videoFile.path,
        thumbnailFilename: thumbnailFile.originalname,
        thumbnailPath: thumbnailFile.path,
      });

      await videoData.save();
      res.send("Files uploaded successfully");
    } catch (error) {
      console.error("Error saving video to database: ", error);
      res.status(500).send("Internal Server Error");
    }
  }
); //done

//get all videos
router.get("/getAllVideos", getAllVideos);
// get specific user video
router.get("/getUserVideo/:videoId", getUserVideo); ///done
// get like count
router.post("/:videoId/likeVideo", likeVideo); // done
// get dislikeCount
router.post("/:videoId/dislikeVideo", dislikeVideo); // done
// deleteUserVideo
router.delete("/:videoId/deleteUserVideo", deleteUserVideo); //done 
// commentRouter 
router.post("/commentPost/comments", commentPost);
// getcommentofvideo
router.get("/:videoId/getAllcommentofvideo/:commentId", getAllcommentofVideo); 
router.post("/pushComment/:videoId" , pushComment)
// subscription router

// get user subscriner
router.get("/getSubscriber/:userId", getSubscriber);
// get subscrierCount
router.get("/countSubscribers/:userId", countSubscribers);
// watchList
// getWtchList
router.get("/getWatchlist/:userId", getWatchlist); //done
// postWathList
router.post("/postWatchlist/:userId", postWatchlist); //done  
// playlist
router.post("/create_playlist", create_playlist); //Done
router.post("/addVideos_to_playlist/:playlistId", addVideos_to_playlist); //Done
router.get("/get_all_playlist", get_all_playlist);
router.delete("/deletePlaylist" , deletePlaylist)
module.exports = router;
 