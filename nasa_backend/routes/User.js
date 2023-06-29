const express = require("express");
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.use(express.json());
router.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => console.log(error));

require("../userDetails");

const User = mongoose.model("UserInfo");

router.post("/signup", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedpassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send({ error: "User already exists with that email" });
    }
    await User.create({
      fname: fname,
      lname: lname,
      email: email,
      password: encryptedpassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: error });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User does not exist" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: 600,
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

router.post("/home", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
      if (err) {
        return "session expired";
      }
      return res;
    });
    console.log(user);
    if (user == "session expired") {
      return res.send({ status: "error", data: "session expired" });
    }

    const user_email = user.email;
    User.findOne({ email: user_email })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

module.exports = router;
