import express, { Request, Response } from 'express';
import { login, signUp } from '../controllers/user.Controller';

const router = express.Router();

// User signup route
router.post('/signup', signUp);

// User login route
router.post('/login', login);

export default router;
