// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
const path = require("path");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

//Api route
app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress: req.ip,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  });
});

// Not found
app.use(function (req, res, next) {
  res.status(404);
  // respond with html page
  if (req.accepts("html")) {
    res.sendFile(path.resolve("views/404.html"));
    return;
  }
  // respond with json
  if (req.accepts("json")) {
    res.json({ error: "Not found" });
    return;
  }
  // default to plain-text. send()
  res.type("txt").send("Not found");
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
