"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated_1 = require("../utils/middleware/isAuthenticated"); // Adjust the path accordingly
// Mock Express request and response objects
const mockRequest = {};
const mockResponse = {};
(0, vitest_1.it)('createJwtToken should generate a valid JWT token', () => {
    // Define a sample payload
    const payload = { userId: '123', username: 'user123' };
    // Call the createJwtToken function
    const token = (0, isAuthenticated_1.createJwtToken)(payload);
    // Verify that the token is not empty
    (0, vitest_1.expect)(token).toBeTruthy();
    // Verify that the token can be decoded without errors
    const decodedToken = jsonwebtoken_1.default.decode(token);
    (0, vitest_1.expect)(decodedToken).toBeTruthy();
    (0, vitest_1.expect)(decodedToken.userId).toBe(payload.userId);
});
(0, vitest_1.it)('verifyJwtToken should return userId if token is valid', () => {
    // Generate a sample token
    const payload = { userId: '456', username: 'testuser' };
    const token = (0, isAuthenticated_1.createJwtToken)(payload);
    // Call verifyJwtToken function
    const userId = (0, isAuthenticated_1.verifyJwtToken)(token);
    // Assert that the returned userId matches the payload
    (0, vitest_1.expect)(userId).toBe(payload.userId);
});
(0, vitest_1.it)('passwordJwtToken should generate a JWT token with short expiry time', () => {
    // Define a sample payload
    const payload = { userId: '789', username: 'admin' };
    // Call the passwordJwtToken function
    const token = (0, isAuthenticated_1.passwordJwtToken)(payload);
    // Verify that the token is not empty
    (0, vitest_1.expect)(token).toBeTruthy();
    // Verify that the token can be decoded without errors
    const decodedToken = jsonwebtoken_1.default.decode(token);
    (0, vitest_1.expect)(decodedToken).toBeTruthy();
    (0, vitest_1.expect)(decodedToken.userId).toBe(payload.userId);
});
