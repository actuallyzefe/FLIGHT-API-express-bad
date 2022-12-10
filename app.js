const express = require("express");
const app = express();
// Routes
const ticketRouter = require("./routes/ticketRoutes");
const userRouter = require("./routes/userRoutes");
// Security
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit"); // AYNI IPDEN COK FAZLA REQUEST GELIRSE BU REQUESTLERI BLOCKLAYACAK
const mongoSanitize = require("express-mongo-sanitize");

const hpp = require("hpp");

app.get("/", (req, res) => {
  res.send("TEST SUCCESS");
});

app.use(express.json());

app.use("/api/v1/flights", ticketRouter);
app.use("/api/v1/users", userRouter);

// SECURITY
app.use(helmet());
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use(mongoSanitize());

app.use(xss());

app.use(
  hpp({
    whitelist: "duration",
  })
);
exports.app = app;
