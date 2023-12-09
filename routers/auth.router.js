const Router = require("express");
const router = new Router();
const controller = require("../controllers/auth.controller.js");
const { check } = require("express-validator");

router.post(
  "/registration",
  [
    check("name", "name can`t be empty").notEmpty(),
    check("email", "Invalid Email").isEmail(),
    check(
      "password",
      "password must be more than 4 and less than 15 characters"
    ).isLength({ min: 4, max: 15 }),
  ],
  controller.registration
);
router.post("/login", controller.login);

module.exports = router;
