const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/api/tags", (req, res) => {
  res.send([
    "MERN",
    "Node",
    "Express",
    "Webpack",
    "React",
    "Redux",
    "Mongoose",
    "Bulma",
    "Fontawesome",
    "Ramda",
    "ESLint",
    "Jest",
  ]);
});

router.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../dist", "index.html"));
});

module.exports = router;
