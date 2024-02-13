const Multer = require("multer");
const path = require("path");

const storage = Multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = Multer({
  storage,
}).single("image");

module.exports = upload;
