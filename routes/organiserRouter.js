import express from 'express';
import {
  loginPage,
  handleLogin,
  dashboardPage,
  logout,
  createCoursePage,
  createCourse,
  createClassPage,
  createClass,
} from '../controllers/organiserController.js';
import { login, verify } from '../auth/auth.js';

const router = express.Router();

router.get('/organiser/login', loginPage);
router.post('/organiser/login', login, handleLogin);

router.get('/organiser/dashboard', verify, dashboardPage);
router.get('/organiser/logout', verify, logout);

router.get('/organiser/course/new', verify, createCoursePage);
router.post('/organiser/course/new', verify, createCourse);

router.get('/organiser/class/new', verify, createClassPage);
router.post('/organiser/class/new', verify, createClass);

export default router;
