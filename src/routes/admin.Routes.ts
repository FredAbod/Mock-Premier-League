import express, { Request, Response } from 'express';
import { login, signUp } from '../controllers/admin.Controller';

const router = express.Router();

// Admin Signup
router.post('/signup', signUp)

// Admin Login
router.post('/login', login);

export default router;
