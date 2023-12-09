const { Schema, model } = require("mongoose");

const gradeSchema = new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: "User" },
  assigment_id: { type: Schema.Types.ObjectId, ref: "Assignment" },
  score: { type: Number, default: -1 },
  feedback: { type: String },
  submission_date: { type: Object, default: new Date() },
});

// console.log(model("grade", gradeSchema));
module.exports = model("Grade", gradeSchema);

// a. id: A unique identifier for the grade entry.
// b. student_id: Foreign key linking to the student's user profile.
// c. assignment_id: Foreign key linking to the assignment.
// d. score: The score or grade awarded to the student.
// e. feedback: Comments or feedback provided by the teacher.
// f. submission_date: The date when the student submitted the
