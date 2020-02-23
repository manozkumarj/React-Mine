const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Global end point
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to Contact-Keeper API :)" });
});

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

// Assigning a port to app to listen
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
