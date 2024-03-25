import { it, expect, describe } from "vitest";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { isAuthenticated, createJwtToken, verifyJwtToken, passwordJwtToken } from '../utils/middleware/isAuthenticated'; // Adjust the path accordingly

// Mock Express request and response objects
const mockRequest = {} as Request;
const mockResponse = {} as Response;
  

it('createJwtToken should generate a valid JWT token', () => {
  // Define a sample payload
  const payload = { userId: '123', username: 'user123' };

  // Call the createJwtToken function
  const token = createJwtToken(payload);

  // Verify that the token is not empty
  expect(token).toBeTruthy();

  // Verify that the token can be decoded without errors
  const decodedToken = jwt.decode(token) as JwtPayload;
  expect(decodedToken).toBeTruthy();
  expect(decodedToken.userId).toBe(payload.userId);
});

it('verifyJwtToken should return userId if token is valid', () => {
  // Generate a sample token
  const payload = { userId: '456', username: 'testuser' };
  const token = createJwtToken(payload);

  // Call verifyJwtToken function
  const userId = verifyJwtToken(token);

  // Assert that the returned userId matches the payload
  expect(userId).toBe(payload.userId);
});

it('passwordJwtToken should generate a JWT token with short expiry time', () => {
  // Define a sample payload
  const payload = { userId: '789', username: 'admin' };

  // Call the passwordJwtToken function
  const token = passwordJwtToken(payload);

  // Verify that the token is not empty
  expect(token).toBeTruthy();

  // Verify that the token can be decoded without errors
  const decodedToken = jwt.decode(token) as JwtPayload;
  expect(decodedToken).toBeTruthy();
  expect(decodedToken.userId).toBe(payload.userId);
});
