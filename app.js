const express = require("express");
const app = express();
// const router = require("./routes/ticketRoutes");

app.get("/", (req, res) => {
  res.send("TEST SUCCESS");
});

app.use(express.json());

// app.use("/api/v1/tickets", router);

exports.app = app;
