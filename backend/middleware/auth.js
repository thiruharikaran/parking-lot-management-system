const jwt = require('jsonwebtoken');
const SECRET = 'parking_secret_key';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(403).json({ msg: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
