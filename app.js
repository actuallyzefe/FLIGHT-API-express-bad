const express = require("express");
const app = express();
const ticketRouter = require("./routes/ticketRoutes");
const userRouter = require("./routes/userRoutes");
app.get("/", (req, res) => {
  res.send("TEST SUCCESS");
});

app.use(express.json());

app.use("/api/v1/flights", ticketRouter);
app.use("/api/v1/users", userRouter);

exports.app = app;
