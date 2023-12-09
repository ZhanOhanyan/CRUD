const Router = require("express");
const router = new Router();
const courseController = require("../controllers/course.controller");
const { check } = require("express-validator");
const middlewares = require("../middleware/auth.middleware");
const assignmentController = require("../controllers/assignment.controller");

router.get(
  "/",
  (req, res, next) => {
    next();
    // res.send("mta verev@");
  },
  middlewares.isAuthorized,
  courseController.courses
);

router.get(
  "/:courseId",
  middlewares.isAuthorized,
  courseController.getCourseById
);

router.post(
  "/",
  [
    check("title", "title can`t be empty").notEmpty(),
    check("description", "description can`t be empty").notEmpty(),
  ],
  (req, res, next) => {
    next();
  },
  middlewares.isAuthorized,
  middlewares.isNotStudent,
  courseController.createNewCourse
);

router.put(
  "/:courseId",
  [
    check("title", "title can`t be empty").notEmpty(),
    check("description", "description can`t be empty").notEmpty(),
  ],
  middlewares.isAuthorized,
  middlewares.isNotStudent,
  courseController.editCourse
);

router.delete(
  "/:courseId",
  middlewares.isAuthorized,
  middlewares.isNotStudent,
  courseController.deleteCourseById
);

router.get(
  "/:courseId/assignments",
  middlewares.isAuthorized,
  assignmentController.getAssingmentsByCourseId
);

router.post(
  "/:courseId/assignments",
  [
    check("title", "title can`t be empty").notEmpty(),
    check("content", "content can`t be empty").notEmpty(),
    check("course_id", "course_id can`t be empty").notEmpty(),
  ],
  middlewares.isAuthorized,
  middlewares.isNotStudent,
  assignmentController.createAssingmentsByCourseId
);

module.exports = router;
