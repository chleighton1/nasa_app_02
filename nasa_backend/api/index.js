const express = require("express");
const app = express();
const userRoute = require("../routes/User");
const authRouter = require("../routes/oauth");
const requestRouter = require("../routes/request");

app.use(userRoute);
app.use("/oauth", authRouter);
app.use("/request", requestRouter);

app.use(express.json());
// app.use(cors());

if (process.env.PORT) {
  app.listen(process.env.PORT, () => {
    console.log("Server Started");
  });
}

module.exports = app;
