const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Contact = require("./models/Contact");
const multer = require("multer");
const fs = require("fs");

app.use(cors());
app.use(express.json());

//database connection
mongoose.connect("mongodb://localhost:27017/Contact-Manager", {
  useNewUrlParser: true,
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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
        uid: user.id,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/api/create/:uid", upload.single("image"), async (req, res) => {
  console.log("for image");
  try {
    const contact = new Contact({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      email: req.body.email,
      photograph: req.file.originalname,
      user: req.params.uid,
    });
    contact.save();
    console.log(contact);
    res.send({ status: "ok", contact: contact });
  } catch (error) {
    res.send(error);
  }
});

app.get("/api/contacts/:uid", async (req, res) => {
  console.log(req.params.uid);
  Contact.find({ user: req.params.uid }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      // console.log(result);
      res.send(result);
    }
  });
});

app.get("/api/contact/:id", async (req, res) => {
  const contact = await Contact.findOne({
    _id: req.params.id,
  });
  res.send(contact);
});

app.post("/api/update/:id", upload.single("image"), async (req, res) => {
  console.log(req.file.filename);
  Contact.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      photograph: req.file.originalname,
    },
    function (err, docs) {
      if (err) res.json(err);
      else {
        console.log(req.params.id);
        res.send({ status: "ok" });
      }
    }
  );
});

app.delete("/api/delete/:id", async (req, res) => {
  console.log("delete comes");
  const id = req.params.id;
  await Contact.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("App is running on port 3001!");
});
