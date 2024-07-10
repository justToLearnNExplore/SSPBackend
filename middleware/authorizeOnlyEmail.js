//Authorization middleware
const authorizeOnlyEmail = (email) => {
    return (req, res, next) => {
      if (req.userEmail !== email) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    };
  };
  
  module.exports = authorizeOnlyEmail;
  