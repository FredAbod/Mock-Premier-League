"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const bcrypt_1 = require("../utils/lib/bcrypt");
(0, vitest_1.describe)('passwordHash function', () => {
    (0, vitest_1.it)('should hash a password successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const password = 'password123';
        const hashedPassword = yield (0, bcrypt_1.passwordHash)(password);
        // Check if the hashed password is not empty
        (0, vitest_1.expect)(hashedPassword).toBeTruthy();
        // You can add more specific tests for the hashed password if needed
    }));
    (0, vitest_1.it)('should throw an error when hashing an invalid or empty password', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidPassword = ''; // An empty string is an invalid password
        yield (0, vitest_1.expect)(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, bcrypt_1.passwordHash)(invalidPassword); })).rejects.toThrow('Password cannot be empty');
    }));
});
(0, vitest_1.describe)('passwordCompare function', () => {
    (0, vitest_1.it)('should return true when comparing a password with its hash', () => __awaiter(void 0, void 0, void 0, function* () {
        const password = 'password123';
        const hashedPassword = yield (0, bcrypt_1.passwordHash)(password);
        // Check if passwordCompare returns true for the correct password
        const isMatch = yield (0, bcrypt_1.passwordCompare)(password, hashedPassword);
        (0, vitest_1.expect)(isMatch).toBe(true);
    }));
    (0, vitest_1.it)('should return false when comparing a password with an incorrect hash', () => __awaiter(void 0, void 0, void 0, function* () {
        const password = 'password123';
        const hashedPassword = yield (0, bcrypt_1.passwordHash)(password);
        // Check if passwordCompare returns false for an incorrect password
        const isMatch = yield (0, bcrypt_1.passwordCompare)('incorrectPassword', hashedPassword);
        (0, vitest_1.expect)(isMatch).toBe(false);
    }));
    (0, vitest_1.it)('should throw an error when comparing with an invalid hash', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidHash = ''; // An empty string is an invalid hash
        yield (0, vitest_1.expect)(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, bcrypt_1.passwordCompare)('password123', invalidHash); })).rejects.toThrow('Error comparing passwords');
    }));
});
