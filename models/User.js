const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile_picture: { type: String },
  role: {
    type: String,
    enum: ["STUDENT", "TEACHER", "ADMIN"],
    default: "STUDENT",
  },
  date_joined: { type: Object, default: new Date() },
  last_login: { type: Object, default: new Date() },
  bio: { type: String, default: "I am User" },
});
// console.log(model("User", userSchema));
module.exports = model("User", userSchema);

// id: A unique identifier for the user.
// b. name: The full name of the user.
// c. email: The user's email address.
// d. role: The role of the user (e.g., student, teacher, admin).
// e. password: Hashed password for account security.
// f. date_joined: The date the user's account was created.
// g. last_login: The date and time of the user's last login.
// h. profile_picture: A link to the user's profile picture (optional).
// i. bio: A short biography or description about the user (optional
// for students and teachers).
