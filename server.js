"use strict";

var express = require("express");
var cors = require("cors");

// require and use "multer"...
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// post method for fileanalyse
app.post("/api/fileanalyse", upload.single("upfile"), function(req, res) {
  const name = req.file.originalname;
  const type = req.file.mimetype;
  const size = req.file.size;
  const response = { name: name, type: type, size: size };
  res.json(response);
});

app.get("/hello", function(req, res) {
  res.json({ greetings: "Hello, API" });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Node.js listening ...");
});
