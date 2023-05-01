const Technology = require("../models/Technology");

exports.subtopics = (req, res, next) => {
  const arr = [];
  const desiredTechnologyName = req.params.technology;
  Technology.findOne({ name: desiredTechnologyName })
    .select("subtopics.name")
    .exec((err, technology) => {
      if (err) {
        console.error(err);
      } else if (!technology) {
        console.log(`Technology '${desiredTechnologyName}' not found.`);
      } else {
        console.log(`Subtopics of '${desiredTechnologyName}':`);
        technology.subtopics.forEach((subtopic) => {
          console.log(subtopic.name);
          arr.push(subtopic.name);
        });
      }
      return res.status(200).send({ message: "Subtopics", subtopics: arr });
    });
  //   return res.status(400).send({ message: "Something went wrong" });
};

exports.subtopicData = (req, res, next) => {
  const arr = [];
  const desiredTechnologyName = req.params.technology;
  const desiredSubtopicName = req.params.subtopic;

  // Technology.findOne({ name: desiredTechnologyName })
  //   .select("subtopics")
  //   .exec((err, technology) => {
  //     if (err) {
  //       console.error(err);
  //     } else if (!technology) {
  //       console.log(`Technology '${desiredTechnologyName}' not found.`);
  //     } else {
  //       const subtopic = technology.subtopics.find(
  //         (sub) => sub.name === desiredSubtopicName
  //       );
  //       if (!subtopic) {
  //         console.log(`Subtopic '${desiredSubtopicName}' not found.`);
  //       } else {
  //         // console.log(`Data for '${desiredSubtopicName}':`);
  //         // console.log(subtopic);
  //         return res
  //           .status(200)
  //           .send({ message: "data fetched", subtopicData: subtopic });
  //       }
  //     }
  //   });
  Technology.findOne({ name: desiredTechnologyName })
    .select("subtopics")
    .populate({
      path: "subtopics.questions.userId subtopics.questions.answers.userId subtopics.videos.userId",
      model: "User",
      select: "username",
    })
    .exec((err, technology) => {
      if (err) {
        console.error(err);
      } else if (!technology) {
        console.log(`Technology '${desiredTechnologyName}' not found.`);
      } else {
        const subtopic = technology.subtopics.find(
          (sub) => sub.name === desiredSubtopicName
        );
        if (!subtopic) {
          console.log(`Subtopic '${desiredSubtopicName}' not found.`);
        } else {
          // console.log(`Data for '${desiredSubtopicName}':`);
          // console.log(subtopic);
          return res
            .status(200)
            .send({ message: "data fetched", subtopicData: subtopic });
        }
      }
    });

};

exports.addQuestion = async (req, res, next) => {
  const technologyName = req.body.technology;
  const subtopicName = req.body.subtopic;
  try {
    const technology = await Technology.findOne({ name: technologyName });
    if (!technology) {
      throw new Error("Technology not found");
    }

    const subtopic = technology.subtopics.find(
      (sub) => sub.name === subtopicName
    );
    if (!subtopic) {
      throw new Error("Subtopic not found");
    }

    const newQuestion = {
      question: req.body.question,
      answers: [],
      userId: req.userId,
      upvotes: 0,
      downvotes: 0,
    };

    subtopic.questions.push(newQuestion);
    await technology.save();
    return res.status(200).send({ message: "Question added",subtopic:subtopic.questions });
    // return newQuestion;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.addAnswer = (req, res, next) => {
  const questionId = req.body.questionId;
  const answer = {
  answer: req.body.answer,
  userId: req.userId
};
Technology.findOneAndUpdate(
  { 'subtopics.questions._id': questionId },
  { 
    $push: { 'subtopics.$[subtopic].questions.$[question].answers': answer },
    'subtopics.$[subtopic].questions.$[question].updatedAt': new Date()
  },
  { 
    arrayFilters: [
      { 'subtopic.questions': { $elemMatch: { _id: questionId } } }, 
      { 'question._id': questionId }
    ],
    new: true
  },
  (err, technology) => {
    if (err) {
      console.log(err);
    } else {
      const subtopic = technology.subtopics.find(subtopic => subtopic.questions.some(question => question._id.toString() === questionId));
      const question = subtopic.questions.find(question => question._id.toString() === questionId);
      // console.log(question,subtopic.questions);
      res.status(200).send({message:"Answer added",questions:subtopic.questions})
    }
  }
);
   
}
const mongoose = require("mongoose");
exports.allAnswers = (req, res, next) => {

  const id= req.userId;
//   Technology.aggregate([
//   { $unwind: "$subtopics" },
//   { $unwind: "$subtopics.questions" },
//   { $unwind: "$subtopics.questions.answers" },
//   {
//     $match: {
//       "subtopics.questions.answers.userId": mongoose.Types.ObjectId(id)
//     }
//   },
//   {
//     $project: {
//       _id: 0,
//       question: "$subtopics.questions.question",
//       answer: "$subtopics.questions.answers.answer"
//     }
//   }
// ]).then((data) => {
//   console.log(data);
//   res.status(200).send({message:"QA list",qalist:data})
// }).catch((error) => {
//   console.log(error);
// });
 Technology.find({
  "subtopics.questions.answers.userId": id
})
.populate({
  path: "subtopics.questions.userId",
  select: "username"
})
.exec((err, technologies) => {
  if (err) {
    console.error(err);
  } else {
    const answers = [];
    technologies.forEach((technology) => {
      technology.subtopics.forEach((subtopic) => {
        subtopic.questions.forEach((question) => {
          question.answers.forEach((answer) => {
            if (answer.userId && answer.userId.equals(id)) {
              answers.push({
                question: question.question,
                answer: answer.answer,
                upvotes: answer.upvotes,
                downvotes: answer.downvotes,
                author: question.userId.username
              });
            }
          });
        });
      });
    });
    console.log(answers);
    return res.status(200).send({
      message: "Answers fetched",
      answers: answers,
    });
  }
});


}

exports.allQuestions = (req, res,next) => {
   // const id= req.userId;
 const userId = req.userId;
Technology.aggregate([
  { $unwind: "$subtopics" },
  { $unwind: "$subtopics.questions" },
  { $unwind: "$subtopics.questions.answers" },
  {
    $lookup: {
      from: "users",
      localField: "subtopics.questions.answers.userId",
      foreignField: "_id",
      as: "answerAuthor"
    }
  },
  {
    $match: {
      "subtopics.questions.userId": mongoose.Types.ObjectId(userId)
    }
  },
  {
    $project: {
      _id: 0,
      qid: "$subtopics.questions._id",
      question: "$subtopics.questions.question",
      upvotes: "$subtopics.questions.upvotes",
      downvotes: "$subtopics.questions.downvotes",
      answer: "$subtopics.questions.answers.answer",
      answerAuthor: {
        $arrayElemAt: ["$answerAuthor.username", 0]
      }
    }
  },
  {
    $group: {
      _id: "$qid",
      question: { $first: "$question" },
      upvotes: { $first: "$upvotes" },
      downvotes: { $first: "$downvotes" },
      answers: {
        $push: {
          answer: "$answer",
          answerAuthor: "$answerAuthor"
        }
      }
    }
  },
  {
    $project: {
      qid: "$_id",
      _id: 0,
      question: 1,
      upvotes: 1,
      downvotes: 1,
      answers: 1
    }
  }
]).exec(function (err, result) {
  if (err) {
    console.log(err);
    res.status(500).json({ message: "Some problem occurred", err });
  } else {
    console.log("result",result);
    res.json({ message: "QA list", qalist: result });
  }
});



}

exports.addVideo = (req, res, next) => {
  const subtopic = req.body.subtopic;
  const tech = req.body.technology;
  Technology.updateOne(
  { name: tech , "subtopics.name": subtopic },
  { $push: { "subtopics.$.videos": { url: req.body.video, userId: req.userId } } },
  function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Some problem occured", err });
    } else {
      console.log('res',result);
      res.json({ message: "Video added successfully" });
    }
  }
);

}

exports.vote = async (req, res, next) => {
  const SUBTOPIC_ID = req.body.subtopicId;
  const QUESTION_ID = req.body.questionId;
  const ANSWER_ID = req.body.answerId;
  const USER_ID = req.userId;
  const upvote = req.body.upvote;
  const voteType = upvote ? 'upvote' : 'downvote';
  console.log(SUBTOPIC_ID,QUESTION_ID,ANSWER_ID,USER_ID,upvote);
 try {
    // Find the technology by subtopic id
    const technology = await Technology.findOne({ "subtopics._id": SUBTOPIC_ID });

    if (!technology) {
      throw new Error("Technology not found");
    }

    // Find the subtopic by subtopic id
    const subtopic = technology.subtopics.find((sub) => sub._id.equals(SUBTOPIC_ID));

    if (!subtopic) {
      throw new Error("Subtopic not found");
    }

    // Find the question by question id
    const question = subtopic.questions.find((ques) => ques._id.equals(QUESTION_ID));

    if (!question) {
      throw new Error("Question not found");
    }

    // Find the answer by answer id
    const answer = question.answers.find((ans) => ans._id.equals(ANSWER_ID));

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Check if the user has already upvoted or downvoted the answer
    const hasUpvoted = answer.upvoters.some((upvoter) => upvoter.equals(USER_ID));
    const hasDownvoted = answer.downvoters.some((downvoter) => downvoter.equals(USER_ID));

    // Update the vote count and voters based on the vote type
    if (voteType === "upvote" && !hasUpvoted) {
      answer.upvotes += 1;
      answer.upvoters.push(USER_ID);

      if (hasDownvoted) {
        answer.downvotes -= 1;
        answer.downvoters = answer.downvoters.filter((downvoter) => !downvoter.equals(USER_ID));
      }
    } else if (voteType === "downvote" && !hasDownvoted) {
      answer.downvotes += 1;
      answer.downvoters.push(USER_ID);

      if (hasUpvoted) {
        answer.upvotes -= 1;
        answer.upvoters = answer.upvoters.filter((upvoter) => !upvoter.equals(USER_ID));
      }
    } else {
      throw new Error("User has already voted");
    }

    // Save the changes to the database
    await technology.save();

   console.log("Vote updated successfully");
    console.log(`Upvotes: ${answer.upvotes}, Downvotes: ${answer.downvotes}`);
    return res.status(200).send({message:"vote done",upvotes:answer.upvotes,downvotes:answer.downvotes})
  } catch (error) {
    console.error(error);
  }

}