const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  answer: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  upvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  downvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});


const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answers: [answerSchema],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
});

const videoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const subtopicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  videos: [videoSchema],
  questions: [questionSchema],
  description: { type: String },
  codeSample: { type: String },
});

const technologySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subtopics: [subtopicSchema],
});

const Technology = mongoose.model("Technology", technologySchema);

module.exports = Technology;
