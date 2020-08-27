const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var path = require("path");

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello World, from express");
});
app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
