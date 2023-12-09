const Router = require("express");
const router = new Router();
const { check } = require("express-validator");
const middlewares = require("../middleware/auth.middleware");
const assignmentController = require("../controllers/assignment.controller");

router.get(
  "/:studentId/grades",
  middlewares.isAuthorized,
  assignmentController.getGrades
);

module.exports = router;
