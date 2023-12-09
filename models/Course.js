const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
  title: { type: String },
  description: { type: String },
  teacher_id: { type: Schema.Types.ObjectId, ref: "TEACHER" },
  start_date: { type: Object },
  credits: { type: Number, default: 0 },
  enrollment_limit: { type: Number, default: 10 },
  status: {
    type: String,
    enum: ["active", "comleted", "upcoming"],
    default: "upcoming",
  },
});

module.exports = model("Course", courseSchema)

// # a. id: a unique identifier for the course
// # b. title: the name of the course
// # c. description: a brief overview of what the course
// # entails(optional)
// # d. teacher_id: foreign key, or reference(Object_id in mongo) linking
// # to the teacher’s user profile
// # e. start_date: the date when the course begins
// # f. credits: the number of credits or points the course is worth, if
// # applicable.
// # g. enrollment_limit: maximum number of students who can enroll.
// # h. status: indicates if the course is active, completed or upcoming
