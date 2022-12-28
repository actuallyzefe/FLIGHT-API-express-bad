const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { app } = require('./app');

dotenv.config();

const start = async () => {
  if (!process.env.DATABASE) throw new Error('MONGO_URI must be defined');
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to db');
  } catch (error) {
    console.log(error);
  }
};

start();

const port = 3000;
app.listen(port, () => {
  console.log(`Server live on http://localhost:${port}`);
});
