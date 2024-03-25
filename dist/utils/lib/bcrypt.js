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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordCompare = exports.passwordHash = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * Hashes a password using bcrypt.
 * @param password The password to hash.
 * @returns A promise that resolves to the hashed password.
 */
const passwordHash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!password) {
        throw new Error('Password cannot be empty');
    }
    try {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hash = yield bcryptjs_1.default.hash(password, salt);
        return hash;
    }
    catch (error) {
        throw new Error('Error hashing password');
    }
});
exports.passwordHash = passwordHash;
/**
 * Compares a password with a bcrypt hash.
 * @param password The password to compare.
 * @param hash The hash to compare against.
 * @returns A promise that resolves to true if the password matches the hash, false otherwise.
 */
const passwordCompare = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMatchPassword = yield bcryptjs_1.default.compare(password, hash);
        return isMatchPassword;
    }
    catch (error) {
        throw new Error('Error comparing passwords');
    }
});
exports.passwordCompare = passwordCompare;
