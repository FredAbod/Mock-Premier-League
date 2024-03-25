import express, { Request, Response } from 'express';
import { login, signUp } from '../controllers/admin.Controller';

const router = express.Router();

// Admin signup route
router.post('/signup', signUp);

// Admin login route
router.post('/login', login);

export default router;
