const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routers/auth.router.js");
const courseRouter = require("./routers/course.router.js");
const studentRouter = require("./routers/student.router.js");
const assignmentRouter = require("./routers/assingment.router.js");
const userRouter = require("./routers/user.router.js");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/assingments", assignmentRouter);
app.use("/api/students", studentRouter);
app.use("/api/users", userRouter);

app.use("/*", (req, res) => {
  res.status(404).send("Page not Found");
});

const start = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/Academy_Project`);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
