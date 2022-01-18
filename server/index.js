const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcrypt");
import User from "./models/models";

app.use(cors());
app.use(express.json());

//database connection
mongoose.connect("mongodb://localhost:27017/Contact-Manager", {
  useNewUrlParser: true,
});

//Tasks for api's
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    user.save();
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.listen(3001, () => {
  console.log("App is running on port 3001!");
});
