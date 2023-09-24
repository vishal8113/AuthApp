const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://vishal123:zxstwYiNYqc6gCEa@auth.srgvc2p.mongodb.net/Users",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
