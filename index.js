const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose"); 
const router = require("./router/routing");
const cookieParser = require("cookie-parser"); 

app.use(express.json());
app.use(cors());
app.use(("/api") , router);
app.use(cookieParser());

const connection = mongoose.connect("mongodb://127.0.0.1:27017/viteTube");
if (connection) {
  console.log("succesfully connected");
} else {
  console.log("something is wrong");
} 
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});