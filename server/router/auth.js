import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controller/auth.js';

const router = express.Router();

const validateCredential = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('username should be at least 5 characters'),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('password should be at least 5 characters'),
];

router.post('/signup', validateCredential, authController.signUp);
router.post('/login', validateCredential, authController.login);

export default router;
