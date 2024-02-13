const mongoose = require("mongoose");
const { Schema } = mongoose;
const subscriberCount = new Schema({
  subscriber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  channel : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  }
});

const subscriptionModule = mongoose.model("subscriptionCount", subscriberCount);
module.exports = subscriptionModule;
