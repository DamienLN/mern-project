const { default: mongoose } = require("mongoose");
const mongose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.j0m9jql.mongodb.net/Groupomania"
  )

  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log("Failed to connect to mongoDB", err));
