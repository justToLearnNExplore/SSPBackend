const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const corsConfig = require('./middleware/corsConfig');

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(corsConfig);
require('./config/db');

const gameRoutes = require('./routes/gameRoutes');
const imageRoutes = require('./routes/imageRoutes');
const userRoutes = require('./routes/userRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

app.use('/api', gameRoutes);
app.use('/api', imageRoutes);
app.use('/api', userRoutes);
app.use('/api', enquiryRoutes);

app.use('/images', express.static('upload/images'));

app.get("/", (req, res) => {
  res.send("Express App is Running");
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log("Error: " + error);
  }
});
