"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordJwtToken = exports.verifyJwtToken = exports.createJwtToken = exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../lib/response");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Middleware to authenticate incoming requests using JWT token.
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The next middleware function.
 */
const isAuthenticated = (req, res, next) => {
    var _a;
    try {
        // Extract token from request headers
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return (0, response_1.errorResMsg)(res, 401, "Authentication failed: No token provided");
        }
        // Verify and decode the token
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET environment variable is not defined");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Attach decoded token information to the request object
        req.user = decoded;
        // Call next middleware
        next();
    }
    catch (error) {
        console.error("Authentication failed:", error);
        return (0, response_1.errorResMsg)(res, 401, "Authentication failed: Invalid token");
    }
};
exports.isAuthenticated = isAuthenticated;
/**
 * Creates a JWT token with the given payload.
 * @param payload The payload to include in the token.
 * @returns The JWT token.
 */
const createJwtToken = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2d",
    });
    return token;
};
exports.createJwtToken = createJwtToken;
/**
 * Verifies a JWT token and returns the decoded userId.
 * @param token The JWT token to verify.
 * @returns The decoded userId.
 */
const verifyJwtToken = (token) => {
    try {
        const { userId } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return userId;
    }
    catch (error) {
        console.error("Error verifying JWT token:", error);
        return undefined;
    }
};
exports.verifyJwtToken = verifyJwtToken;
/**
 * Creates a JWT token with the given payload and short expiry time (5 minutes).
 * @param payload The payload to include in the token.
 * @returns The JWT token.
 */
const passwordJwtToken = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "5m" });
    return token;
};
exports.passwordJwtToken = passwordJwtToken;
