import express from 'express';
import {
  homePage,
  classDetails,
  courseDetails,
  handleEnrolment,
} from '../controllers/controller.js';

const router = express.Router();

router.get('/', homePage);
router.get('/class/:id', classDetails);
router.get('/course/:id', courseDetails);

router.post('/enrolment', handleEnrolment);

export default router;
