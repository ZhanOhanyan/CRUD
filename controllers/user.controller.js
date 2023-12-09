const Assignment = require("../models/Assignment");
const bcrypt = require("bcryptjs");
const Course = require("../models/Course");
const User = require("../models/User");
const Grade = require("../models/Grade");
const { validationResult } = require("express-validator");

class userController {
  async getUser(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).send("User not found");
      }

      if (req.user.role === "STUDENT" && user._id !== req.user._id) {
        return res.status(403).send("Dont have permision");
      }

      res.send(user);
    } catch (err) {
      console.log(err);
    }
  }
  async updateUser(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).send("User not found");
      }

      if (req.user.role === "STUDENT" && req.user._id !== user._id) {
        return res.status(403).send("Dont have permision");
      }

      for (let key in req.body) {
        if (key === "role" && req.user.role !== "ADMIN") {
          continue;
        }
        if (key !== "password") {
          user[key] = req.body[key];
        } else {
          user[key] = bcrypt.hashSync(req.body[key], 5);
        }
      }

      console.log(user);

      user.save();
      return res.send("user succesfully updated");
    } catch (err) {
      console.log(err);
    }
  }
  async deleteUser(req, res) {
    try {
      let user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).send("User not fined");
      }
      await User.deleteOne(user);
      return res.send("User succesfully deleted");
    } catch (err) {
      console.log(err);
    }
  }
  async createUser(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Registrations errors :", errors });
      }

      const { name, email, password, role, profile_picture } = req.body;
      const candidate = await User.findOne({ name });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Sorry, this nickname is busy" });
      }

      const hashPassword = bcrypt.hashSync(password, 5);

      const user = new User({
        name,
        email,
        password: hashPassword,
        role,
        profile_picture: profile_picture,
      });

      console.log(profile_picture);
      console.log(user);
      user.save();
      return res.json({ message: "registration finished successfuly" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Registration error" });
    }
  }
}

module.exports = new userController();
