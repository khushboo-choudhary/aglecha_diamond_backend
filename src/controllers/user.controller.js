require("dotenv").config();
const express = require("express");
const User = require("../models/user.model");

const router = express.Router();

//api to get all user data
router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//api to get single user details
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean().exec();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//api to create new user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).send({ message: "User created successfully", user });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//api to update user details
router.patch("/", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });

    res.status(200).send({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//api to delete user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).send({ message: "User deleted successfully", user });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
