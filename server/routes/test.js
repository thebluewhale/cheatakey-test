const express = require("express");
const testSet = require("../testSet/testSet");
const { Result } = require("../database/schemas");

const router = express.Router();

module.exports = router;

router.get("/testlists", (req, res) => {
  let lists = testSet;
  res.send({ message: "Test lists are retrieved successfully", lists });
});

router.post("/result", (req, res) => {
  const { presented, submitted, leadTime } = req.body;
  let newResult = new Result({
    presentedText: presented,
    submittedText: submitted,
    leadTime: leadTime,
  });
  newResult.save((err) => {
    if (err) {
      console.log("test posting failed");
      console.log(err);
      res.status(400).send({ message: "Test result posting failed" });
    } else {
      console.log("test posting success");
      res.send({ message: "Test result posting success" });
    }
  });
});
