const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
const path = require("path");
const port = process.env.PORT || 5000;
const users = require("./routers/v1/users");

//internal import
const { notFounderHandler, errorHandler } = require("./middleWares/errorHandler");

// express app initialization
const app = express();
dotenv.config();
app.use(
  cors({
    credentials: true,
    crossDomain: true,
    origin: ["http://localhost:3000"],
  })
);

app.use(express.json());

//database connection
mongoose
  .connect("mongodb://localhost/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => console.log("connection success"))
  .catch((err) => console.log(err));

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//routers
app.use("/api/v1/user", users);

//
app.use(notFounderHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listen port ${port}`);
});
