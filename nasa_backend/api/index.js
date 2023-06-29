const express = require("express");
const app = express();
const userRoute = require("../routes/User");
const authRouter = require("../routes/oauth");
const requestRouter = require("../routes/request");

const whitelist = [
  '*'
];

app.use((req, res, next) => {
  const origin = req.get('referer');
  const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
  if (isWhitelisted) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
  }
  // Pass to next layer of middleware
  if (req.method === 'OPTIONS') res.sendStatus(200);
  else next();
});

const setContext = (req, res, next) => {
  if (!req.context) req.context = {};
  next();
};
app.use(setContext);


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
