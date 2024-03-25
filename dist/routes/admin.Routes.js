"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_Controller_1 = require("../controllers/admin.Controller");
const router = express_1.default.Router();
// Admin Signup
router.post('/signup', admin_Controller_1.signUp);
// Admin Login
router.post('/login', admin_Controller_1.login);
exports.default = router;
