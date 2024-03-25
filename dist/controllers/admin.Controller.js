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
exports.login = exports.signUp = void 0;
const admin_Models_1 = require("../models/admin.Models"); // Import the Admin interface and AdminModel
const validation_1 = require("../utils/validation/validation");
const response_1 = require("../utils/lib/response");
const bcrypt_1 = require("../utils/lib/bcrypt");
const isAuthenticated_1 = require("../utils/middleware/isAuthenticated");
// Define the signUp function
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate request body against signUpSchema
        const validationResult = validation_1.signUpSchema.validate(req.body);
        if (validationResult.error) {
            return res
                .status(400)
                .json({ error: validationResult.error.details[0].message });
        }
        // Request body is valid, proceed with sign-up logic
        const { firstName, lastName, email, password } = req.body;
        // Check if email is provided
        if (!email) {
            return (0, response_1.errorResMsg)(res, 400, "Email is required");
        }
        // Check if the email is already registered
        const existingUser = yield admin_Models_1.AdminModel.findOne({ email });
        if (existingUser) {
            return (0, response_1.errorResMsg)(res, 400, "Email already registered");
        }
        const hashedPassword = yield (0, bcrypt_1.passwordHash)(password);
        const admin = new admin_Models_1.AdminModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        yield admin.save();
        // Return success response
        return (0, response_1.successResMsg)(res, 201, {
            success: true,
            user: admin,
            message: "Admin created successfully",
        });
    }
    catch (error) {
        console.error("Error in signUp:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate request body against loginSchema
        const validationResult = validation_1.loginSchema.validate(req.body);
        if (validationResult.error) {
            return res
                .status(400)
                .json({ error: validationResult.error.details[0].message });
        }
        // Request body is valid, proceed with login logic
        const { email, password } = req.body;
        // Check if the user exists
        const admin = yield admin_Models_1.AdminModel.findOne({ email });
        if (!admin) {
            return (0, response_1.errorResMsg)(res, 400, "Admin Not Found");
        }
        // Check if the password is correct
        const isPasswordValid = yield (0, bcrypt_1.passwordCompare)(password, admin.password);
        if (!isPasswordValid) {
            return (0, response_1.errorResMsg)(res, 400, "Invalid email or password");
        }
        // Generate JWT token
        const token = (0, isAuthenticated_1.createJwtToken)({ userId: admin._id, role: admin.role });
        res.cookie("access_token", token);
        // Return success response with token
        return (0, response_1.successResMsg)(res, 200, {
            message: "User successfully logged in",
            success: true,
            data: {
                userId: admin._id,
                token,
            },
        });
    }
    catch (error) {
        console.error("Error in login:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.login = login;
