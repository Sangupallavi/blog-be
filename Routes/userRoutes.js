import express from 'express';
import { signup, login, resetPassword } from '../controllers/usercontroller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/:id/reset-password', resetPassword);

export default router;
