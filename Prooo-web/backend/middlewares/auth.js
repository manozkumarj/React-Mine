const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get the token from header
  const tempToken = req.header("x-auth-token");

  // Check if not token
  if (!tempToken) {
    console.log("No token found, Authorization denied");
    return res
      .status(401)
      .json({ success: false, msg: "No token found, Authorization denied" });
  }

  let splitToken = tempToken.split("@@");
  const token = splitToken[1];

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // console.log(decoded.data);
    req.user = decoded.data;
    next();
  } catch (error) {
    console.log("Token is not valid, Authorization denied");
    return res
      .status(401)
      .json({
        success: false,
        msg: "Token is not valid, Authorization denied",
      });
  }
};
