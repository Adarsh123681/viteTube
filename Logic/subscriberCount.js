const User = require("../model/Userschema");
const SubscriberCount = require("../model/subscriptionSchema");
const mongoose = require("mongoose");
// get subscriber for the user
const getSubscriber = async (req, res) => {
  const userId = req.params.userId; 
  try {
    const subscriberCount = await SubscriberCount.findOne({ userId });
    res.json(subscriberCount);
  } catch (error) {
     
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Route to update subscriber count for a user
const countSubscribers = async (req, res) => {
  const userId = req.params.userId;

  try {
    let subscriberCount = await SubscriberCount.findOne({ userId });

    if (!subscriberCount) {
      //Create a new subscriber count entry if it doesn't exist
      subscriberCount = new SubscriberCount({ userId });
    } 
    // Increment the subscriber count (adjust as needed based on your use case)
    const num = subscriberCount.count += 1;
    console.log(num)
    // Save the updated subscriber count
    await subscriberCount.save();

    res.json(subscriberCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { getSubscriber, countSubscribers };
 