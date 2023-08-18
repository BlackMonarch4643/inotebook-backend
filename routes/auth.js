const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const jwtauth = require("../middleware/jwtauth");

// ROUTE 1: create a user using: POST "/api/auth/CreateUser". Doesn't require Auth
const JWT_SECRET = "Udit is a goodb$oy";

router.post(
  "/CreateUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "A password must be more than 5 character Long").isLength({
      min: 3,
    }),
    body("email", "Enter a valid Email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      // console.log(user);
      if (user) {
        return res.status(400).json({ error: "Sorry !!! Email Exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: securedPassword,
        email: req.body.email,
        salt: salt,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      //   console.log(jwtdata);
      //   res.json(user);
      res.json({ authtoken });
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
    //   .then((user) => res.json(user))
    //   .catch((err) => {
    //     res.json({ error: "Email Already Exists", msg: err.message });
    //   });
    // res.send(req.body);
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);
  }
);

// ROUTE 2: create a user using: POST "/api/auth/login". No Login required
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // if error return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // find email if exists in DB
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please enter valid credentials" });
      }
      const psswdCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!psswdCompare) {
        return res
          .status(400)
          .json({ error: "Please enter valid credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get user details using: POST "/api/auth/userdetails". Login required or auth required
router.post("/userdetails", jwtauth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password -salt");
    res.json({ user });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
