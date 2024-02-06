const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized: Token not available" });
      }
  
      const accessToken = authHeader.split(" ")[1];
  
      jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.error("JWT verification failed:", err.message);
          return res.status(401).json({ error: "Unauthorized: Invalid token" });
        } else {
          console.log("JWT decoded:", decoded);
          req.userEmail = decoded.email;
          next();
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }

  function verifyAdmin(req,res,next){
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized: Token not available" });
      }
  
      const accessToken = authHeader.split(" ")[1];
  
      jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        
        if (err) {
          console.error("JWT verification failed:", err.message);
          return res.status(401).json({ error: "Unauthorized: Invalid token" });
        } else {
          if(!decoded.isAdmin) return res.status(401).send({error: "Unauthorized:Not an Admin"})
          req.userEmail = decoded.email;
          req.isAdmin=true
          next();
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }
 module.exports={verifyToken,verifyAdmin};