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
  manageClassPage,
  updateClass,
  deleteClass,
  deleteCourse,
  manageCoursePage,
  updateCourse,
  manageClassEnrolmentsPage,
  manageCourseEnrolmentsPage,
  deleteEnrolment,
  manageOrganisersPage,
  createOrganiser,
  deleteOrganiser,
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

router.get('/organiser/course/manage/:id', verify, manageCoursePage);
router.post('/organiser/course/update/:id', verify, updateCourse);
router.post('/organiser/course/delete/:id', verify, deleteCourse);

router.get('/organiser/class/manage/:id', verify, manageClassPage);
router.post('/organiser/class/update/:id', verify, updateClass);
router.post('/organiser/class/delete/:id', verify, deleteClass);

router.get(
  '/organiser/class/manage/:id/enrolments',
  verify,
  manageClassEnrolmentsPage
);
router.get(
  '/organiser/course/manage/:id/enrolments',
  verify,
  manageCourseEnrolmentsPage
);
router.post('/organiser/enrolment/delete/:id', verify, deleteEnrolment);

router.get('/organiser/manage/organisers', verify, manageOrganisersPage);
router.post('/organiser/manage/organisers/add', verify, createOrganiser);
router.post('/organiser/manage/organisers/delete/:id', verify, deleteOrganiser);

export default router;
