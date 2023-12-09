const Assignment = require("../models/Assignment");
const Course = require("../models/Course");
const User = require("../models/User");
const Grade = require("../models/Grade");
const { validationResult } = require("express-validator");

class assignmentController {
  async getAssingmentsByCourseId(req, res) {
    try {
      let course_id = req.params.courseId;
      let assignments = await Assignment.find({ course_id });
      if (!assignments || !assignments.length) {
        return res
          .status(404)
          .send("Not found any assignments by this courseid");
      }
      res.json(assignments);
    } catch (err) {
      console.log(err);
    }
  }

  async createAssingmentsByCourseId(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "post end error", errors });
      }
      let searchCourse = await Course.findById(req.params.courseId);
      if (!searchCourse) {
        return res.status(404).send("CourseId is invalid");
      }
      const { title, content, due_date, posted_date, max_score, submission } =
        req.body;
      const candidate = await Assignment.findOne({ title });

      if (candidate) {
        return res.status(400).json({
          message: "Sorry, they are some assingnment with this title",
        });
      }
      let userRole = req.user.roles;
      if (userRole !== "ADMIN" && req.user._id !== searchCourse.teacher_id) {
        return res.status(403).send("Don't have permission");
      }

      const assignment = new Assignment({
        title,
        content,
        due_date,
        course_id: req.params.courseId,
        posted_date,
        max_score,
        submission,
      });
      assignment.save();
      return res.send("Assingment succesfully created");
    } catch (err) {
      console.log(err);
    }
  }

  async updateAssingment(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "post end error", errors });
      }
      let assignmentToChange = await Assignment.findById(
        req.params.assignmentId
      );
      if (assignmentToChange === null) {
        return res.status(404).send("Assignment not found");
      }

      let searchCourse = await Course.findById(assignmentToChange.course_id);


      if (
        req.user.roles !== "ADMIN" &&
        req.user._id !== searchCourse.teacher_id
      ) {
        return res.status(403).send("Don't have permission");
      }
      for (let key in req.body) {
        if (key !== "course_id") {
          assignmentToChange[key] = req.body[key];
        }
      }
      assignmentToChange.save();
      return res.send("Assingment succesfully changed");
    } catch (err) {
      console.log(err);
    }
  }
  async deleteAssingment(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "post end error", errors });
      }
      let assignmentToDelete = await Assignment.findById(
        req.params.assingmentId
      );

      if (!assignmentToDelete) {
        return res.status(404).send("Assingment not found");
      }

      await Assignment.deleteOne(assignmentToDelete);
      return res.send("Assingment succesfully deleted");
    } catch (err) {
      console.log(err);
    }
  }
  async sumbitGrade(req, res) {
    try {
      let assingmentId = req.params.assingmentId;
      const { student_id, assignment_id, score, feedback, submission_date } =
        req.body;
      const user = await User.findById(student_id);
      if (!user || user.role !== "STUDENT") {
        return res.status(404).send("Student by this id not found");
      }

      const assignment = await Assignment.findById(assingmentId);

      if (!assignment) {
        return res.status(404).send("Assigment not found");
      }

      const course = await Course.findById(assignment.course_id);

      if (
        !course ||
        (req.user.roles === "TEACHER" && course.teacher_id !== req.user._id)
      ) {
        return res
          .status(403)
          .send("Assigment haven`t courseId or Don't have permission");
      }
      const grade = new Grade({
        student_id,
        assignment_id,
        score,
        feedback,
        submission_date,
      });
      grade.save();
      return res.send("Grade succesfully sumbited");
    } catch (err) {
      console.log(err);
    }
  }
  async getGrades(req, res) {
    const studentId = req.params.studentId;
    const user = await User.findById(studentId);
    if (!user || user.role !== "STUDENT") {
      return res.status(404).send("Student not found");
    }
    if (req.user.role === "STUDENT" && req.user._id !== user._id) {
      return res.status(403).send("Dont have permision");
    }

    const grades = await Grade.find({ student_id: studentId });
    return res.send(grades);
  }
}

module.exports = new assignmentController();
