const Router = require("express");
const router = new Router();
const { check } = require("express-validator");
const middlewares = require("../middleware/auth.middleware");
const assignmentController = require("../controllers/assignment.controller");
const { login } = require("../controllers/auth.controller");

router.put(
  "/:assignmentId",
  [
    check("title", "title can`t be empty").notEmpty(),
    check("content", "content can`t be empty").notEmpty(),
    check("course_id", "course_id can`t be empty").notEmpty(),
  ],
  middlewares.isAuthorized,
  middlewares.isNotStudent,
  assignmentController.updateAssingment
);

router.delete(
  "/:assingmentId",

  middlewares.isAuthorized,
  middlewares.isNotStudent,
  assignmentController.deleteAssingment
);

router.post(
  "/:assingmentId/grade",
  middlewares.isAuthorized,
  middlewares.isNotStudent,
  [
    check(
      "score",
      "score must be more than 0 and less than 10 characters"
    ).custom((value) => {
      if (value < 0 || value > 10) {
        return false;
      }
      return true;
    }),
    check("feedback", "feedback can`t be empty").notEmpty(),
  ],
  assignmentController.sumbitGrade
);

module.exports = router;
