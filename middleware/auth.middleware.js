const jwt = require("jsonwebtoken");

const isAuthorized = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(403).json({ message: "User is not authorized" });
    }
    console.log(process.env.JWT_SECRET);
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "User is not authorized" });
  }
};

const isNotStudent = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(404).send("User not found");
  }

  if (user.roles === "STUDENT") {
    return res.status(403).send("Don't have permission");
  }

  next();
};

const isNotTeacher = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(404).send("User not found");
  }

  if (user.roles === "TEACHER") {
    return res.status(403).send("Don't have permission");
  }

  next();
};

module.exports = {
  isAuthorized,
  isNotStudent,
  isNotTeacher,
};
