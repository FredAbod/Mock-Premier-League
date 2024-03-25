import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { errorResMsg } from "../lib/response";
import dotenv from "dotenv";

dotenv.config();

interface DecodedToken extends JwtPayload {
  userId: string; // Adjust this type according to your payload
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken; // Define user property with DecodedToken type
    }
  }
}

/**
 * Middleware to authenticate incoming requests using JWT token.
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The next middleware function.
 */
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract token from request headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return errorResMsg(res, 401, "Authentication failed: No token provided");
    }

    // Verify and decode the token
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not defined");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

    // Attach decoded token information to the request object
    req.user = decoded;

    // Call next middleware
    next();
  } catch (error) {
    console.error("Authentication failed:", error);
    return errorResMsg(res, 401, "Authentication failed: Invalid token");
  }
};

/**
 * Creates a JWT token with the given payload.
 * @param payload The payload to include in the token.
 * @returns The JWT token.
 */
const createJwtToken = (payload: any): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "2d",
  });
  return token;
};

/**
 * Verifies a JWT token and returns the decoded userId.
 * @param token The JWT token to verify.
 * @returns The decoded userId.
 */
const verifyJwtToken = (token: string): string | undefined => {
  try {
    const { userId } = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as DecodedToken;
    return userId;
  } catch (error) {
    console.error("Error verifying JWT token:", error);
    return undefined;
  }
};

/**
 * Creates a JWT token with the given payload and short expiry time (5 minutes).
 * @param payload The payload to include in the token.
 * @returns The JWT token.
 */
const passwordJwtToken = (payload: any): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "5m" });
  return token;
};

export { isAuthenticated, createJwtToken, verifyJwtToken, passwordJwtToken };
