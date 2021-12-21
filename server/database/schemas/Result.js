const mongoose = require("mongoose");

const { Schema } = mongoose;

const testResult = new Schema({
  presentedText: {
    type: String,
    trim: true,
  },
  submittedText: {
    type: String,
    trim: true,
  },
  leadTime: Number,
  accuracy: Number,
  speed: Number,
  testType: {
    type: String,
    trim: true,
  },
  keyboardType: {
    type: String,
    trim: true,
  },
  nickName: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Result = mongoose.model("Result", testResult);

module.exports = Result;
