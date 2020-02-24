const express = require("express");
const app = express();
const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

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
