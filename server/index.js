const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Contact = require("./models/Contact");

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

app.post("/api/login", async (req, res) => {
  console.log("backend comes");
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    console.log("invalid user");
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    console.log("valid user");
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.get("api/contacts", async (req, res) => {});

app.listen(3001, () => {
  console.log("App is running on port 3001!");
});
