import express, { Request, Response } from 'express';
import { login, signUp } from '../controllers/user.Controller';


const router = express.Router();

// User Signup
router.post('/signup', signUp)

// Admin Login
router.post('/login', login);

export default router;
