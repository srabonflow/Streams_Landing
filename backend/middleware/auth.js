const jwt = require("jsonwebtoken");

const auth = () => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer")) {
    return resizeBy.status(401).join({ message: "No token" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
