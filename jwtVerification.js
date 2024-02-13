const user = require("./model/Userschema");
const jwt = require("jsonwebtoken");

// Middleware function for Bearer token verification
const auth = async (req, res, next) => {
  const authHeader = await req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No Bearer Token provided" });
  }

  const token = await authHeader.replace("Bearer ", "").trim();
  console.log(token);
  // Verify the token using the provided secret key
  try {
    const verified = jwt.verify(token, "adarshtripathidsfvngjtudopwqxmvngh");
    console.log(verified);
    // Attach the decoded token to the request object for further use
    if (!verified) {
      res.status(400).json({ message: "Authorization failed token not Found" });
    } else {
      const findUser = await user.findOne({
        _id: verified._id,
      });
      console.log(findUser);
      if (!findUser) {
        return res
          .status(401)
          .json({ message: "Unauthorized - User not found" });
      }
      req.user = findUser;
      req.userId = findUser._id;
      req.token = authHeader;
      next(); // Continue to the next middleware or route handler
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = auth;
