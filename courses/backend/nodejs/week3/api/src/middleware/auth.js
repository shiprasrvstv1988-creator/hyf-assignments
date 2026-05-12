import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authentication required: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Step 2 Requirement: Distinguish between invalid and expired
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          error: "Unauthorized: Token has expired. Please log in again.",
        });
      }

      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  });
};

//Implement authToken Middleware
export const authToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Look up token in DB and join with user info
    const tokenRecord = await db("tokens")
      .join("users", "tokens.user_id", "=", "users.id")
      .where("tokens.token", token)
      .select("users.*", "tokens.expires_at")
      .first();

    if (!tokenRecord) {
      return res.status(401).json({ error: "Invalid token" });
    }

    //Check expiration
    if (
      tokenRecord.expires_at &&
      new Date(tokenRecord.expires_at) < new Date()
    ) {
      return res.status(401).json({ error: "Token expired" });
    }

    // Attach user to request
    req.user = {
      id: tokenRecord.id,
      email: tokenRecord.email,
      role: tokenRecord.role,
    };

    next();
  } catch (error) {
    res.status(500).json({ error: "Database error during auth" });
  }
};

// New middleware for role-based checks
export const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    // Check if user exists (from authenticateJWT) and has the right role
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({
        error: `Forbidden: This action requires the ${requiredRole} role.`,
      });
    }
    next();
  };
};
