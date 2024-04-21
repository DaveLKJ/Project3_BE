const express = require("express");
const path = require("path");

require("dotenv").config();
// add this to .env file
// DATABASE_URL = mongodb+srv://seif-project3:eI3ULKTqR5HGNBw0@cluster0.bfsnzo6.mongodb.net/project3?retryWrites=true&w=majority&appName=Cluster0

const app = express();

const PORT = 3001;

app.listen(PORT, function () {
  console.log(`Express app running on port ${PORT}`);
});
