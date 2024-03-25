"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = exports.signUpSchema = exports.loginSchema = exports.validateRequest = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * Middleware function to validate request bodies against a provided schema.
 * @param schema The Joi schema to validate the request body against.
 * @returns Middleware function to be used in Express route handlers.
 */
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            // Joi validation error occurred
            const errorMessage = error.details[0].message;
            return res.status(400).json({ message: errorMessage });
        }
        if (!req.value) {
            req.value = {}; // create an empty object if the request value doesn't exist yet
        }
        req.value["body"] = req.body;
        next();
    };
};
exports.validateRequest = validateRequest;
/**
 * Collection of Joi schemas.
 */
const schemas = {
    authSchema: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        phone: joi_1.default.string().min(10).max(10).required(),
    }),
};
exports.schemas = schemas;
/**
 * Joi schema for sign-up requests.
 */
const signUpSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    password: joi_1.default.string().min(6).trim().required().messages({
        "string.pattern.base": `Password should be 6 characters and contain letters or numbers only`,
        "string.empty": `Password cannot be empty`,
        "any.required": `Password is required`,
    }),
});
exports.signUpSchema = signUpSchema;
/**
 * Joi schema for login requests.
 */
const loginSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    password: joi_1.default.string().min(6).trim().required().messages({
        "string.pattern.base": `Password should be 6 characters and contain letters or numbers only`,
        "string.empty": `Password cannot be empty`,
        "any.required": `Password is required`,
    }),
});
exports.loginSchema = loginSchema;
/**
 * Joi schema for Saving A Fixture.
 */
const fixtureSchema = joi_1.default.object({
    homeTeam: joi_1.default.string().required(),
    awayTeam: joi_1.default.string().required(),
    location: joi_1.default.string().required(),
    status: joi_1.default.string().valid('pending', 'completed').required(),
    result: joi_1.default.object({
        homeTeamScore: joi_1.default.number().integer().min(0).required(),
        awayTeamScore: joi_1.default.number().integer().min(0).required(),
    }),
});
