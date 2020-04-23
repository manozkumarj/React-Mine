const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const users = require("./routes/users");
const posts = require("./routes/posts");
const config = require("./config");
const app = express();
const connectDB = require("./config/db");
const port = 8088;

// Connect to Database
connectDB();

// parsing the data
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use(cors());
app.options("*", cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Access denied" });
});

app.get("/details", (req, res) => {
  let projectName = config.project_name;
  let deploymentType = config.deployment_type;
  res.json({
    projectName,
    deploymentType,
  });
});

app.get("/api/", (req, res) => {
  res.status(200).json({ msg: "This is API home route" });
});

app.use("/api/users", users);
app.use("/api/posts", posts);

app.listen(port, () => {
  console.log(`Server is listening on ${port} port`);
});
