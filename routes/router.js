import express from 'express';
import {
  homePage,
  classDetails,
  courseDetails,
} from '../controllers/controller.js';

const router = express.Router();

router.get('/', homePage);
router.get('/class/:id', classDetails);
router.get('/course/:id', courseDetails);

export default router;
