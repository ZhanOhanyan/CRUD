const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const util = require("../utils.js");
// const generateAccessToken = (id, roles) => {
//   const payload = {
//     id,
//     roles,
//   };
//   console.log(process.env.JWT_SECRET);
//   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
// };

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Registrations errors :", errors });
      }

      const { name, email, password } = req.body;
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
        role: "STUDENT",
      });

      user.save();
      return res.json({ message: "registration finished successfuly" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ name: username });

      if (!user) {
        return res.status(400).json({ message: "Invalid Login" });
      }
      user.last_login = new Date();

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid Password" });
      }

      const token = util.generateAccessToken(user._id, user.role);
      return res.json({ token });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "error login", err });
    }
  }
}

module.exports = new authController();
