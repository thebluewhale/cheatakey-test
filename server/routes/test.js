const express = require("express");

const router = express.Router();

module.exports = router;

router.get("/testlists", (req, res) => {
  console.log("get router reached");
  let lists = ["time flies like an arrow", "early bird gets bug"];
  res.send({ message: "Test lists are retrieved successfully", lists });
});

router.post("/result", (req, res) => {
  const { presented, submitted, leadTime } = req.body;
  res.send({ message: "Test result posted successfully" });
});
