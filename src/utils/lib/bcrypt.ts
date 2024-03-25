import bcrypt from 'bcryptjs';

/**
 * Hashes a password using bcrypt.
 * @param password The password to hash.
 * @returns A promise that resolves to the hashed password.
 */
const passwordHash = async (password: string): Promise<string> => {
  if (!password) {
    throw new Error('Password cannot be empty');
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};


/**
 * Compares a password with a bcrypt hash.
 * @param password The password to compare.
 * @param hash The hash to compare against.
 * @returns A promise that resolves to true if the password matches the hash, false otherwise.
 */
const passwordCompare = async (password: string, hash: string): Promise<boolean> => {
  try {
    if (!hash) {
      throw new Error('Invalid hash provided');
    }
    const isMatchPassword = await bcrypt.compare(password, hash);
    return isMatchPassword;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};


export { passwordHash, passwordCompare };
