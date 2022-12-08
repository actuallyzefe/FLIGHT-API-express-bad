const express = require("express");
const app = express();
const router = require("./routes/ticketRoutes");

app.get("/", (req, res) => {
  res.send("TEST SUCCESS");
});

app.use("/api/v1/tickets", router);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
