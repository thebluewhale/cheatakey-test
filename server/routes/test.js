const express = require("express");
const testSet = require("../testSet/testSet");

const router = express.Router();

module.exports = router;

router.get("/testlists", (req, res) => {
  let lists = testSet;
  res.send({ message: "Test lists are retrieved successfully", lists });
});

router.post("/result", (req, res) => {
  const { presented, submitted, leadTime } = req.body;
  res.send({ message: "Test result posted successfully" });
});
