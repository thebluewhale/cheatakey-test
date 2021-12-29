const express = require("express");
const testSet = require("../testSet/testSet");
const { Result } = require("../database/schemas");

const router = express.Router();

module.exports = router;

router.get("/testlists", (req, res) => {
  let lists = testSet;
  res.send({ message: "Test lists are retrieved successfully", lists });
});

router.post("/testervariables", (req, res) => {
  let variables = req.body;
  res.send({
    message: "Tester variables are retrieved successfully",
    variables,
  });
});

router.post("/result", (req, res) => {
  const {
    presented,
    submitted,
    leadTime,
    accuracy,
    speed,
    testType,
    keyboardType,
    nickName,
    reportType,
  } = req.body;
  let newResult = new Result({
    presentedText: presented,
    submittedText: submitted,
    leadTime: leadTime,
    accuracy: accuracy,
    speed: speed,
    testType,
    keyboardType,
    nickName,
    reportType,
  });
  newResult.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ message: "Test result posting success" });
    }
  });
});
