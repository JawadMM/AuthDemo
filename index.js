const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();
const User = require("./models/user");

mongoose.connect("mongodb://127.0.0.1:27017/authDemo");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("HomePage");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const newUser = new User({ username, password: hash });
  await newUser.save();
  res.redirect("/");
});

app.get("/secret", (req, res) => {
  res.send("You cannot see this unless you are logged in.");
});

app.listen(3000, () => {
  console.log("Serving your app");
});
