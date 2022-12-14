require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(require("./routes"));

app.listen(3000, function () {
  console.log("Server running on port 3000");
});

app.use("/", function (req, res) {
  return res.sendFile("index.html", {
    root: path.join(__dirname, "views"),
  });
});
