const Router = require("express");
const router = new Router();
const { check } = require("express-validator");
const authConntoller = require("../controllers/auth.controller");
const middlewares = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");

router.get(
  "/:userId",
  middlewares.isAuthorized,
  middlewares.isNotTeacher,
  userController.getUser
);
router.put(
  "/:userId",
  [
    check("name", "name can`t be empty").notEmpty(),
    check("email", "Invalid Email").isEmail(),
    check(
      "password",
      "password must be more than 4 and less than 15 characters"
    ).isLength({ min: 4, max: 15 }),
  ],
  middlewares.isAuthorized,
  middlewares.isNotTeacher,
  userController.updateUser
);
router.post(
  "/",
  [
    check("name", "name can`t be empty").notEmpty(),
    check("email", "Invalid Email").isEmail(),
    check(
      "password",
      "password must be more than 4 and less than 15 characters"
    ).isLength({ min: 4, max: 15 }),
    check("profile_picture", "Picture link can be only URL and can`t be empty")
      .isURL()
      .notEmpty(),
  ],
  middlewares.isAuthorized,
  middlewares.isNotStudent,
  middlewares.isNotTeacher,
  userController.createUser
);

router.delete(
  "/:userId",
  middlewares.isAuthorized,
  middlewares.isNotStudent,
  middlewares.isNotTeacher,
  userController.deleteUser
);

module.exports = router;
