const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//body parser middleware
app.use(bodyParser.json());



// DB Config
// const db = config.get('mongoURI');
const db = require('./config/keys').mongoURI;
// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));


 const port = process.env.PORT || 5000;

 app.listen(port, () => console.log(`server started on port ${port}`))