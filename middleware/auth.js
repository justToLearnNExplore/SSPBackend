const jwt = require("jsonwebtoken");

//Authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedData?._id;
      req.userEmail = decodedData?.email;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
      req.userEmail = decodedData?.email;
    }

    next();
  } catch (error) {
    
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = auth;
