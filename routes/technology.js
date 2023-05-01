const express = require("express");
const router = express.Router();
const technologyController = require("../controllers/technology");
const isAuth = require("../middleware/is-auth");

router.get("/subtopics/:technology", technologyController.subtopics);
router.get(
  "/subtopicData/:technology/:subtopic",
  technologyController.subtopicData
);
router.post("/addQuestion", isAuth, technologyController.addQuestion);
router.post("/addAnswer", isAuth, technologyController.addAnswer);
router.get("/allAnswers",isAuth, technologyController.allAnswers);
router.get("/allQuestions",isAuth, technologyController.allQuestions);
router.post("/addVideo", isAuth, technologyController.addVideo);
router.post("/vote",isAuth,technologyController.vote)
module.exports = router;
