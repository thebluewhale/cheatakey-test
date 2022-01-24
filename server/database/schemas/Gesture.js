const mongoose = require("mongoose");

const { Schema } = mongoose;

const gestureData = new Schema({
  touchStartX: Number,
  touchStartY: Number,
  touchEndX: Number,
  touchEndY: Number,
  submittedAngle: Number,
  presentedAngle: Number,
  testType: {
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

const Gesture = mongoose.model("Gesture", gestureData);

module.exports = Gesture;
