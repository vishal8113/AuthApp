const express = require("express");
const app = express();

require("dotenv").config();

const Port = process.env.PORT || 4000;

app.use(express.json());

require("./config/database").dbConnect();

const user = require("./Routes/user");
app.use("/api/v1/", user);

app.listen(Port, () => {
  console.log(`Server Started Successfully at port ${Port}`);
});
