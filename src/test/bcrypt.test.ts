import { it, expect, describe } from 'vitest';
import { passwordHash, passwordCompare } from '../utils/lib/bcrypt';

describe('passwordHash function', () => {
  it('should hash a password successfully', async () => {
    const password = 'password123';
    const hashedPassword = await passwordHash(password);
    
    // Check if the hashed password is not empty
    expect(hashedPassword).toBeTruthy();
    
    // You can add more specific tests for the hashed password if needed
  });
  
  it('should throw an error when hashing an invalid or empty password', async () => {
    const invalidPassword = ''; // An empty string is an invalid password
    await expect(async () => await passwordHash(invalidPassword)).rejects.toThrow('Password cannot be empty');
  });
});

describe('passwordCompare function', () => {
  it('should return true when comparing a password with its hash', async () => {
    const password = 'password123';
    const hashedPassword = await passwordHash(password);
    
    // Check if passwordCompare returns true for the correct password
    const isMatch = await passwordCompare(password, hashedPassword);
    expect(isMatch).toBe(true);
  });

  it('should return false when comparing a password with an incorrect hash', async () => {
    const password = 'password123';
    const hashedPassword = await passwordHash(password);
    
    // Check if passwordCompare returns false for an incorrect password
    const isMatch = await passwordCompare('incorrectPassword', hashedPassword);
    expect(isMatch).toBe(false);
  });
  
  it('should throw an error when comparing with an invalid hash', async () => {
    const invalidHash = ''; // An empty string is an invalid hash
    await expect(async () => await passwordCompare('password123', invalidHash)).rejects.toThrow('Error comparing passwords');
  });
});
