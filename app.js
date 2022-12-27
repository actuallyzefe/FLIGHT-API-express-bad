const express = require('express');
const app = express();
// Routes
const flightRouter = require('./routes/flightRoutes');
const userRouter = require('./routes/userRoutes');
const ticketRouter = require('./routes/ticketRoutes');
// Security
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit'); // AYNI IPDEN COK FAZLA REQUEST GELIRSE BU REQUESTLERI BLOCKLAYACAK
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

app.get('/', (req, res) => {
  res.send('TEST SUCCESS');
});

app.use(express.json());

app.use('/api/v1/flights', flightRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tickets', ticketRouter);
app.get('/accepted', (req, res) => {
  res.status(200).json({
    status: 'success',
  });
});
app.get('/cancelled', (req, res) => {
  res.status(200).json({
    status: 'cancelled',
  });
});

// SECURITY
app.use(helmet());
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(mongoSanitize());

app.use(xss());

app.use(
  hpp({
    whitelist: 'duration',
  })
);
// TEST MIDDLEWARES
// app.use((req, res, next) => {
//   const mes = (req.requestTime = new Date().toISOString());
//   next();
// });

exports.app = app;
