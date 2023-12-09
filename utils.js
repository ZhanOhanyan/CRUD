const jwt = require("jsonwebtoken");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };


  console.log(process.env.JWT_SECRET);
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};

module.exports = {
  generateAccessToken,
};
