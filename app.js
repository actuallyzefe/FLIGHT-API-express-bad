const express = require("express");
const app = express();
const router = express.Router();

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
