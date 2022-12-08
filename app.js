const express = require("express");
const app = express();
const ticketRouter = require("./routes/ticketRoutes");

app.get("/", (req, res) => {
  res.send("TEST SUCCESS");
});

app.use(express.json());

app.use("/api/v1/tickets", ticketRouter);

exports.app = app;
