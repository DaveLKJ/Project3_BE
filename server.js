const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("moragan");

require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

const PORT = 3001;

app.listen(PORT, function () {
  console.log(`Express app running on port ${PORT}`);
});
