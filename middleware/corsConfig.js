const cors = require("cors");

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

//CORS configuration
const corsConfig = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET, POST, PUT, DELETE',
  credentials: true
});

module.exports = corsConfig;
