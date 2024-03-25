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
const user_Controller_1 = require("../controllers/user.Controller");
const user_Models_1 = require("../models/user.Models");
describe('Authentication Controller', () => {
    let app;
    beforeAll(() => {
        // Initialize Express app for testing
        app = express();
        // Mock UserModel methods used in controller
        user_Models_1.UserModel.findOne = jest.fn();
        user_Models_1.UserModel.prototype.save = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('Sign Up', () => {
        it('should successfully create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const req = {
                body: {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@example.com',
                    password: 'password123',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            user_Models_1.UserModel.findOne.mockResolvedValue(null); // User does not exist
            yield (0, user_Controller_1.signUp)(req, res);
            expect(user_Models_1.UserModel.findOne).toHaveBeenCalledWith({ email: req.body.email });
            expect(user_Models_1.UserModel.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        }));
        // Write more test cases for different scenarios (e.g., invalid input, existing user, etc.)
    });
    describe('Login', () => {
        it('should successfully log in a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const req = {
                body: {
                    email: 'john@example.com',
                    password: 'password123',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                cookie: jest.fn(),
            };
            const mockUser = {
                _id: 'user123',
                role: 'user',
                password: 'hashedPassword',
            };
            user_Models_1.UserModel.findOne.mockResolvedValue(mockUser);
            const token = 'mockToken';
            const createJwtToken = jest.spyOn(global, 'createJwtToken').mockReturnValue(token);
            yield (0, user_Controller_1.login)(req, res);
            expect(user_Models_1.UserModel.findOne).toHaveBeenCalledWith({ email: req.body.email });
            expect(createJwtToken).toHaveBeenCalledWith({ userId: mockUser._id, role: mockUser.role });
            expect(res.cookie).toHaveBeenCalledWith('access_token', token);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        }));
        // Write more test cases for different scenarios (e.g., invalid credentials, etc.)
    });
});
