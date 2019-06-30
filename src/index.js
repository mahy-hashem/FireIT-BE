const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const mongoConnect = require("./database").mongoConnect;

const postsRoutes = require("./routes/posts");

const app = express();

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(postsRoutes);

mongoConnect(() => {
  app.listen(3001);
});
