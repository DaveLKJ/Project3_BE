const express = require("express");
const path = require("path");
const logger = require("morgan");

require("dotenv").config();
require("./config/database");

let user, item, category, order;
let users, items, categories, orders;

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

const PORT = 3001;

app.listen(PORT, function () {
  console.log(`Express app running on port ${PORT}`);
});
