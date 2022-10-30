import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = Router();
import User from "../models/User.js";

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(406).json({ message: "User already exists" });
    return;
  }
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  const user = await User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await user.save();

  res.status(201).json({ message: "user created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (!userExists) {
    res.status(406).json({ message: "Credentials not found" });
    return;
  }

  const matched = await bcrypt.compare(password, userExists.password);
  if (!matched) {
    res.status(406).json({ message: "credentials not found" });
    return;
  }

  //  jwt token

  const payload = {
    username: email,
    _id: userExists._id,
  };

  var token = jwt.sign(payload, process.env.JWT_SECRET);
  res.json({ message: "successfully logged in", token });
});

export default router;
