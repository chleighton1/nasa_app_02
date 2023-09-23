import express from "express";
import userRoute from "../routes/User";
import authRouter from "../routes/oauth"
import requestRouter from "../routes/request"

const app: express.Application = express();

app.use(userRoute);
app.use("/oauth", authRouter);
app.use("/request", requestRouter);

app.use(express.json());


if (process.env.PORT) {
  app.listen(process.env.PORT, () => {
    console.log("Server Started");
  });
}

module.exports = app;
