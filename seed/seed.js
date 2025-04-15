import ClassModel from '../models/classModel.js';
import CourseModel from '../models/courseModel.js';
import EnrolmentModel from '../models/enrolmentModel.js';
import {
  mockClasses,
  mockCourses,
  mockEnrolments,
} from '../data/mockData/mockData.js';

const classModel = new ClassModel();
const courseModel = new CourseModel();
const enrolmentModel = new EnrolmentModel();

async function seed() {
  try {
    for (const course of mockCourses) {
      await courseModel.insert(course);
    }
    console.log('Inserted course mock data');

    for (const danceClass of mockClasses) {
      await classModel.insert(danceClass);
    }
    console.log('Inserted class mock data');

    for (const enrolment of mockEnrolments) {
      await enrolmentModel.insert(enrolment);
    }
    console.log('Inserted enrolment mock data');

    console.log('\nMock data inserted');
    process.exit(0);
  } catch (err) {
    console.error('ERROR - Failed to seed mock data: ', err);
    process.exit(0);
  }
}

seed();
