const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Videos = require("../model/videoSchema");

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
   
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: " Videos",
  },
  subscriber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subscriptionCount",
  },
  watchlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "watchList",
  },
});

const JWT_SECRET_KEY = "adarshtripathidsfvngjtudopwqxmvngh";

// Done
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this.id }, JWT_SECRET_KEY);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    console.log("Someting is wrong , error");
  }
};

userSchema.methods.refreshAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this.id }, JWT_SECRET_KEY);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    console.log("Someting is wrong , error");
  }
};

//Done
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
  next();
});

// userSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

const user_model = mongoose.model("User", userSchema);
module.exports = user_model;
