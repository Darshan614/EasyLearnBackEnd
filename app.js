const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();
app.use(cors());
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
const Technology = require("./models/Technology");
const technologyRoutes = require("./routes/technology");
const authRoutes = require("./routes/auth");

app.use(authRoutes);
app.use(technologyRoutes);


// newTechnology.save().then((data) => {
//   console.log("save successfull");
// });

// Technology.updateOne(
//   { 
//     "name": "NodeJS"
//   },
//   {
//     "$set": {
//       "subtopics.$[].videos.$[].url": "TlB_eWDSMt4"
//     }
//   },
//   function(err, result) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//     }
//   }
// );


const port = process.env.PORT || 8080;
const uri =
  "mongodb+srv://" +
  process.env.MONGO_USERNAME +
  ":" +
  process.env.MONGO_PASSWORD +
  "@cluster0.oantu.mongodb.net/Project?retryWrites=true&w=majority";
mongoose
  .connect(uri)
  .then((result) => {
    app.listen(port);
    console.log("Server started");
  })
  .catch((err) => {
    console.log("Some error ocurred");
    console.log(err);
  });
