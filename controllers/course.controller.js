const Course = require("../models/Course");
const { validationResult } = require("express-validator");

class courseController {
  async courses(req, res) {
    try {
      const allCourses = await Course.find();
      res.json(allCourses);
    } catch (err) {
      console.log(err);
    }
  }
  async getCourseById(req, res) {
    try {
      const getCourse = await Course.findOne({ _id: req.params.courseId });
      if (!getCourse) {
        return res.send("Course not found");
      }

      res.json(getCourse);
    } catch (err) {
      console.log(err);
    }
  }

  async createNewCourse(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "post end error", errors });
      }

      const { title, desciption, enrollment_limit } = req.body;

      const candidate = await Course.findOne({ title });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Sorry, they are some course whith this title" });
      }

      const course = new Course({
        title,
        desciption,
      });
      course.save();
      return res.send("Course succesfully created");
    } catch (err) {
      console.log(err);
    }
  }

  async editCourse(req, res) {
    try {
      const getCourse = await Course.findOne({ _id: req.params.courseId });
      if (!getCourse) {
        return res.status(404).send("Course not found");
      }
      const data = req.body;
      if (req.user.roles !== "ADMIN" && req.user._id !== getCourse._id) {
        return res.status(403).send("Don't have permission");
      }
      //   console.log(req.body);

      //   for (let i in data) {
      //     getCourse[i] = data[i];
      //   }
      //   await getCourse.save();

      await Course.updateOne(getCourse, req.body);
      res.send("Course succesfully update");
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCourseById(req, res) {
    try {
      const getCourse = await Course.findOne({ _id: req.params.courseId });
      if (req.user.roles !== "ADMIN" && req.User._id !== getCourse._id) {
        return res.status(403).send("Don't have permission");
      }

      await Course.deleteOne(getCourse._id);
      res.send("Course succesfully deleted");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new courseController();
