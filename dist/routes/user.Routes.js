"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_Controller_1 = require("../controllers/user.Controller");
const router = express_1.default.Router();
// User signup route
router.post('/signup', user_Controller_1.signUp);
// User login route
router.post('/login', user_Controller_1.login);
exports.default = router;
