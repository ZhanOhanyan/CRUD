const { Schema, model } = require("mongoose");

const assignmentSchema = new Schema({
  title: { type: String },
  content: { type: String },
  due_date: { type: Object, default: new Date() },
  course_id: { type: Schema.Types.ObjectId, ref: "Course" },
  posted_date: { type: Object, default: new Date() },
  max_score: { type: Number, default: 10 },
  submission_format: { type: String, enum: ["document", "online_form"] },
});

module.exports = model("Assignment", assignmentSchema);

// a. id: A unique identifier for the assignment.
// b. title: The title of the assignment.
// c. content: Detailed description or content of the assignment.
// d. due_date: Deadline for assignment submission.
// e. course_id: Foreign key linking to the associated course.
// f. posted_date: The date when the assignment was posted.
// g. max_score: The maximum score or grade achievable for the
// assignment.
// h. submission_format: Specifies the format of submission (e.g.,
// document, online form).
