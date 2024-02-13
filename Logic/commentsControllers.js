const User = require("../model/Userschema");
const Video = require("../model/videoSchema");
const Comment = require("../model/Comment");

const commentPost = async (req, res) => {
  try {
    const { message, userName } = await req.body; 
    // const findUser = await User.find({ userName }).populate('userName');
    // if (!findUser) {
    //   res.status(200).json({ message: "user not found" });
    // }
    const comment = new Comment({
      message, // gotted from the req.body line no.8
      userName: userName,
    });
    console.log(comment)
    await comment.save();
  } catch (error) {
    console.log(error);
  }
};

const getAllcommentofVideo = async (req, res) => {
  const videoId = await req.params.videoId;
  const commentId = await req.params.commentId;
  const videoExist = await Video.find({ videoId }).populate(
    "comments",
    "message"
  );
  // condition to check video is there or not
  if (!videoExist) {
    res.status(401).json({ message: "Videos are not found" });
  }
  const findComment = await Comment.findById(commentId);
  if (!findComment) {
    res.status(401).json({ message: "comments are null" });
  }
  // res.status(200).json({ comments: findComment });
};
module.exports = { commentPost, getAllcommentofVideo };
