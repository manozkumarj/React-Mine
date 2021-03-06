const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get the token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    console.log("No token found, Authorization denied");
    return res
      .status(401)
      .json({ msg: "No token found, Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log("Token is not valid, Authorization denied");
    return res
      .status(401)
      .json({ msg: "Token is not valid, Authorization denied" });
  }
};
