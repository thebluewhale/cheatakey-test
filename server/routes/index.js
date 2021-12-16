const express = require("express");
const path = require("path");
const test = require("./test");

const router = express.Router();

router.use("/test", test);

module.exports = router;
