import express from 'express';
import {
  loginPage,
  handleLogin,
  dashboardPage,
  logout,
} from '../controllers/organiserController.js';
import { login, verify } from '../auth/auth.js';

const router = express.Router();

router.get('/organiser/login', loginPage);
router.post('/organiser/login', login, handleLogin);

router.get('/organiser/dashboard', verify, dashboardPage);
router.get('/organiser/logout', verify, logout);

export default router;
