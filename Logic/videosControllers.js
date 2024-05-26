const comments = require("../model/Comment");
const User = require("../model/Userschema");
const Video = require("../model/videoSchema");

const videoUpload = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { link } = req.file;
    const video = await Video.create({
      title,
      filePath: link,
      description,
      uploadDate: Date.now(),
    });
    if (!video) {
      console.log("something is wrong.....");
    } else {
      console.log("video created");
      res.status(200).json({ msg: video });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllVideos = async (req, res) => {
  try {
    const findVideo = await Video.find();
    if (!findVideo) {
      res.send("Video not found");
    } else {
      console.log(findVideo);
    }
  } catch (error) {
    console.log("something is wrong");
  }
};
const getUserVideo = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const getvideo = await Video.findById(videoId);
    if (!getvideo) {
      return res.status(400).json(getvideo);
    } else {
      return res.status(200).json(getvideo);
    }
  } catch (error) {
    res.status(401).json({ mes: error });
  }
}; //done
// like count Video ke Route
const likeVideo = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    console.log(videoId);
    // Increment the like count for the video
    const updated_like_functionality_of_Video = await Video.findByIdAndUpdate(
      videoId,
      {
        $inc: { like: 1 },
      },
      { new: true }
    );
    res.json({ like: updated_like_functionality_of_Video.like });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// dislike videos
const dislikeVideo = async (req, res) => {
  const videoId = req.params.videoId;
  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $inc: { dislike: 1 },
    },
    { new: true }
  );
  console.log(updatedVideo);
  res.json({ dislike: updatedVideo.dislike });
};
// deleteUserVideos
const deleteUserVideo = async (req, res) => {
  // getting the id from the databse
  const videoId = await req.params.videoId;
  // const deletecommentofvideo = Video.comments._id;
  const delVid = await Video.findByIdAndDelete(videoId);
  if (delVid) {
    console.log("deleted");
    res.status(200).json({ message: "VIDEO DELETED SUCCESSFULLY" });
  } else {
    res.status(400).json({ message: "VIDEO NOT DELETED" });
  }
};

// addComment
const pushComment = async (req, res) => {
  const { videoId } = await req.params;
  const {commentId} = await req.body
  const findVideo = await Video.findById(videoId).populate('comments')
  const findcomment = await comments.findOne({commentId : commentId})
  if(!findVideo){
    console.log("Videos are not found")
    res.status(400).json({msg : "something is wrong"})
  }
  findVideo.comments.push(findcomment);
  await findVideo.save()
  res.json(findVideo)
};


module.exports = {
  getAllVideos,
  getUserVideo,
  likeVideo,
  dislikeVideo,
  deleteUserVideo,
  pushComment
};
